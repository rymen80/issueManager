const bcrypt = require('bcryptjs');
const inquirer= require('inquirer');


async function GetHashedString(){
  const question =  await inquirer.prompt([{
    type:"input",
    name:"stringToEncrypt",
    message:"Enter a string that you want to encrypt :"
  }]);

  const salt = await bcrypt.genSalt(10);
  const hashedString = await bcrypt.hash(question.stringToEncrypt, salt);
  console.log("Here is your encrypted string :",hashedString);

}
GetHashedString();
