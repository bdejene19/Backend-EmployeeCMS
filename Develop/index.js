const { addToTable, db, addDept } = require("./prompts/add");
const { addViewDecision } = require("./prompts/addOrView");
const { viewTableFromDb } = require("./prompts/view");

const inquirer = require("inquirer");

const introPrompt = () => {
  return inquirer.prompt([
    {
      type: "confirm",
      message: "View Database?",
      name: "isViewed",
    },
  ]);
};

introPrompt().then((view) => {
  if (view) {
    addViewDecision().then((decision) => {
      const decisionArr = decision.option.split(" ");
      const addOrView = decisionArr[0];
      if (addOrView === "View") {
        viewTableFromDb(decision.option);
      } else if (addOrView === "Add") {
        addToTable(decision.option);
      }
    });
  }
});

module.exports = {};
