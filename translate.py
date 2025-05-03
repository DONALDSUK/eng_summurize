from deep_translator import GoogleTranslator

word = {}

def translate(text):
    translated_text = GoogleTranslator(source='en', target='ko').translate(text)
    word[text] = translated_text
    return translated_text

def get_vocabulary():
    return word
