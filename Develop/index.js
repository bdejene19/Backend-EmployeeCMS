const { addToTable } = require('./prompts/add');
const { addViewDecision } = require('./prompts/addOrView');
const { viewTableFromDb } = require("./prompts/view");

addViewDecision().then(decision => {
    const decisionArr = decision.option.split(" ");
    const addOrView = decisionArr[0];
    if (addOrView === 'View') {
        viewTableFromDb(decision.option);
    } else if (addOrView === 'Add') {
        addToTable(decision.option);
    }
});

module.exports = {
}