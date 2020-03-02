const questions = require('../questions.js');
  describe('confirmAnswerValidator', () => {
    it(`should have function confirmAnswerValidator pass input that is not empty`, () => {
        const input =  questions.confirmAnswerValidator("My repo");
        expect(input).toBe(true);
    });
    
  
    it('should have function confirmAnswerValidator pass input that is empty', () => {
        const input = questions.confirmAnswerValidator("");
        expect(input).toBe(false);
    });
  });