const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const t = new Translator();

suite('Unit Tests', () => {
  test('Translate Mangoes are my favorite fruit. to British English', function() {
    var text = 'Mangoes are my favorite fruit';
    var locale = 'american-to-british';
    var translation = 'Mangoes are my <span class=\"highlight\">favourite</span> fruit';
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test('Translate I ate yogurt for breakfast. to British English', function() {
    var text = 'I ate yogurt for breakfast';
    var locale = 'american-to-british';
    var translation = 'I ate <span class=\"highlight\">yoghurt</span> for breakfast';
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test("Translate We had a party at my friend's condo. to British English", function() {
    var text = "We had a party at my friend's condo";
    var locale = 'american-to-british';
    var translation = "We had a party at my friend's <span class=\"highlight\">flat</span>";
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test('Translate Can you toss this in the trashcan for me? to British English', function() {
    var text = "Can you toss this in the trashcan for me?";
    var locale = 'american-to-british';
    var translation = "Can you toss this in the <span class=\"highlight\">bin</span> for me?";
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test('Translate The parking lot was full. to British English', function() {
    var text = "The parking lot was full";
    var locale = 'american-to-british';
    var translation = "The <span class=\"highlight\">car park</span> was full";
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test('Translate Like a high tech Rube Goldberg machine. to British English', function() {
    var text = "Like a high tech Rube Goldberg machine";
    var locale = 'american-to-british';
    var translation = "Like a high tech <span class=\"highlight\">Heath Robinson device</span>";
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test('Translate To play hooky means to skip class or work. to British English', function(){
    var text = "To play hooky means to skip class or work";
    var locale = 'american-to-british';
    var translation = "To <span class=\"highlight\">bunk off</span> means to skip class or work";
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test('Translate No Mr. Bond, I expect you to die. to British English', function(){
    var text = "No Mr. Bond, I expect you to die";
    var locale = 'american-to-british';
    var translation = "No <span class=\"highlight\">Mr</span> Bond, I expect you to die";
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test('Translate Dr. Grosh will see you now. to British English', function(){
    var text = "Dr. Grosh will see you now";
    var locale = 'american-to-british';
    var translation = "<span class=\"highlight\">Dr</span> Grosh will see you now";
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test('Translate Lunch is at 12:15 today. to British English', function(){
    var text = "Lunch is at 12:15 today";
    var locale = 'american-to-british';
    var translation = "Lunch is at <span class=\"highlight\">12.15</span> today";
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test('Translate We watched the footie match for a while. to American English', function(){
    var text = "We watched the footie match for a while";
    var locale = 'british-to-american';
    var translation = "We watched the <span class=\"highlight\">soccer</span> match for a while";
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test('Translate Paracetamol takes up to an hour to work. to American English', function(){
    var text = "Paracetamol takes up to an hour to work";
    var locale = 'british-to-american';
    var translation = "<span class=\"highlight\">Tylenol</span> takes up to an hour to work";
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test('Translate First, caramelise the onions. to American English', function(){
    var text = "First, caramelise the onions";
    var locale = 'british-to-american';
    var translation = "First, <span class=\"highlight\">caramelize</span> the onions";
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test('Translate I spent the bank holiday at the funfair. to American English', function(){
    var text = "I spent the bank holiday at the funfair";
    var locale = 'british-to-american';
    var translation = "I spent the <span class=\"highlight\">public holiday</span> at the <span class=\"highlight\">carnival</span>";
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test('Translate I had a bicky then went to the chippy. to American English', function(){
    var text = "I had a bicky then went to the chippy";
    var locale = 'british-to-american';
    var translation = "I had a <span class=\"highlight\">cookie</span> then went to the <span class=\"highlight\">fish-and-chip shop</span>";
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test("Translate I've just got bits and bobs in my bum bag. to American English", function(){
    var text = "I've just got bits and bobs in my bum bag";
    var locale = 'british-to-american';
    var translation = "I've just got <span class=\"highlight\">odds and ends</span> in my <span class=\"highlight\">fanny pack</span>";
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test('Translate The car boot sale at Boxted Airfield was called off. to American English', function(){
    var text = "The car boot sale at Boxted Airfield was called off";
    var locale = 'british-to-american';
    var translation = "The <span class=\"highlight\">swap meet</span> at Boxted Airfield was called off";
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test('Translate Have you met Mrs Kalyani? to American English', function(){
    var text = "Have you met Mrs Kalyani?";
    var locale = 'british-to-american';
    var translation = "Have you met <span class=\"highlight\">Mrs.</span> Kalyani?";
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test("Translate Prof Joyner of King's College, London. to American English", function(){
    var text = "Prof Joyner of King's College, London";
    var locale = 'british-to-american';
    var translation = "<span class=\"highlight\">Prof.</span> Joyner of King's College, London";
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test('Translate Tea time is usually around 4 or 4.30. to American English', function(){
    var text = "Tea time is usually around 4 or 4.30";
    var locale = 'british-to-american';
    var translation = "Tea time is usually around 4 or <span class=\"highlight\">4:30</span>";
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test('Highlight translation in Mangoes are my favorite fruit.', function(){
    var text = "Mangoes are my favorite fruit";
    var locale = 'american-to-british';
    var translation = "Mangoes are my <span class=\"highlight\">favourite</span> fruit";
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test('Highlight translation in I ate yogurt for breakfast.', function(){
    var text = 'I ate yogurt for breakfast';
    var locale = 'american-to-british';
    var translation = 'I ate <span class=\"highlight\">yoghurt</span> for breakfast';
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test('Highlight translation in We watched the footie match for a while.', function(){
    var text = "We watched the footie match for a while";
    var locale = 'british-to-american';
    var translation = "We watched the <span class=\"highlight\">soccer</span> match for a while";
    assert.equal(t.chooseReference(text, locale), translation);
  });
  test('Highlight translation in Paracetamol takes up to an hour to work.', function(){
    var text = "Paracetamol takes up to an hour to work";
    var locale = 'british-to-american';
    var translation = "<span class=\"highlight\">Tylenol</span> takes up to an hour to work";
    assert.equal(t.chooseReference(text, locale), translation);
  });
});
