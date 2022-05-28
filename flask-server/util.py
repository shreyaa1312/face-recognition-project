from twilio.rest import Client
import json


def check_face_in_facelist(face_client, image):

    img_source = open(image, 'rb')
    similar_faces = []
    response_detection = face_client.face.detect_with_stream(
        image=img_source,
        detection_model='detection_01',
        recognition_model='recognition_04',
        return_face_attributes=['age', 'gender', 'emotion'],
    )
    for face in response_detection:
        try:
            known_faces = face_client.face_list.get("known-people-facelist")
            similar_faces = face_client.face.find_similar(
                face.face_id, "known-people-facelist")
        except:
            print("FaceList created.")

    return similar_faces


def frame_message(face, dtim):

    string = face.face_attributes.gender.split(".")

    if string[0] == 'female':
        gendertext = "She "
    else:
        gendertext = "He "

    mytext = "A " + string[0] + " aged around " + \
        str(int(face.face_attributes.age)) + " has come to visit you. "
    mytext += gendertext + " looks " + \
        find_emotion(face.face_attributes.emotion) + ". "

    if (dtim != None):
        mytext += gendertext + " last visited you on " + str(dtim.date().strftime(
            "%d %B, %Y")) + " at " + str(dtim.hour) + " hours and " + str(dtim.minute) + " minutes."

    return mytext


def find_emotion(emotion):

    if (emotion.happiness >= 0.5):
        return "happy"
    if (emotion.sadness >= 0.5):
        return "sadness "
    if (emotion.anger >= 0.5):
        return "angry"
    else:
        return "neutral"


def send_whatsapp_message(message):

    credential = json.load(open('Authentication.json'))
    account_sid = credential['account_sid']
    auth_token = credential['auth_token']
    client = Client(account_sid, auth_token)
    from_whatsapp_number = credential['from_whatsapp_number']
    to_whatsapp_number = credential['to_whatsapp_number']
    client.messages.create(
        body=message, from_=from_whatsapp_number, to=to_whatsapp_number)
