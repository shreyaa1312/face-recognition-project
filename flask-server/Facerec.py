import json
import os
from azure.cognitiveservices.vision.face import FaceClient
from msrest.authentication import CognitiveServicesCredentials
import mysql.connector
from util import frame_message
from util import send_whatsapp_message

credential = json.load(open('Authentication.json'))

mydb = mysql.connector.connect(
    host=credential['DB_host'],
    user=credential['DB_user'],
    password=credential['DB_password'],
    database=credential['DB_database'],
)
mycursor = mydb.cursor()

# detects faces in the captured image and checks if the person at doorstep
# is a know person or a stranger and informs accordingly


def facerec(image, home):

    face_client = FaceClient(
        credential['ENDPOINT'], CognitiveServicesCredentials(credential['API_KEY']))

    # checks the image captured from web camera for faces
    img_file = open(image, 'rb')
    response_detection = face_client.face.detect_with_stream(
        image=img_file,
        detection_model='detection_01',
        recognition_model='recognition_04',
        return_face_attributes=['age', 'gender', 'emotion'],
    )

    if(response_detection == []):
        os.remove('./images/img1.jpeg')
        message = "No person is visible."
        return message

    message = " "
    similar_faces = []

    # if face found, checks in known-people-facelist to check if the person
    # is a known person or stranger
    for face in response_detection:
        try:
            known_faces = face_client.face_list.get("known-people--facelist")
            similar_faces = face_client.face.find_similar(
                face.face_id, "known-people--facelist")
        except:
            print("FaceList created.")

    face_ids = [face.face_id for face in response_detection]

    matched_face = []

    # if the face not found in known-people-facelist, adds the person visit date
    # and time in database , if it is his first visit. In case of subsequent visits
    # his visit date and time is updated to the recent visit date and time in
    # database

    flag = 0
    if not similar_faces:
        mycursor.execute("SELECT face_id FROM stranger_detail")
        myresult = mycursor.fetchall()

        for x in myresult:
            fid = x[0]
            matched_face += face_client.face.find_similar(
                face_id=fid,
                face_ids=face_ids
            )

            if matched_face:
                flag = 1
                for matched in matched_face:

                    sql = "SELECT datim FROM stranger_detail where face_id = %s"
                    mycursor.execute(sql, (fid,))
                    myresult = mycursor.fetchall()

                    for x in myresult:
                        dtim = x[0]
                        message = frame_message(response_detection[0], dtim)
                        sql = "UPDATE stranger_detail SET datim = ADDTIME(now(), '05:30:00') WHERE face_id = %s"
                        mycursor.execute(sql, (fid,))
                        mydb.commit()

        if flag == 0:
            for face in response_detection:
                faceid = face.face_id
                query = "insert into stranger_detail VALUES(%s,ADDTIME(now(), '05:30:00'))"
                mycursor.execute(query, (faceid,))
                message = frame_message(response_detection[0], None)
                mydb.commit()

    else:
        for fa in known_faces.persisted_faces:
            for face in similar_faces:
                if(face.persisted_face_id == fa.persisted_face_id):
                    person_details = fa.user_data.split("_")
                    message += "Your " + \
                        person_details[1] + ", " + person_details[0] + \
                        ", has come to visit you. "

    os.remove('./images/img1.jpeg')
    if(home == True):
        return (message)
    else:
        send_whatsapp_message(message)
        return (' ')
