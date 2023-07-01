module.exports.config = {
    name: "antiout",
    eventType: ["log:unsubscribe"],
    version: "0.0.1",
    credits: "DungUwU",
    description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
    let data = (await Threads.getData(event.threadID)).data || {};
    if (!data.antiout) return;
    if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
    const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
    const type = (event.author == event.logMessageData.leftParticipantFbId) ? "Leave by yourself" : "Kicked by The Group Admin";
    if (type == "Leave by yourself") {
        api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
            if (error) {
                api.sendMessage(`[ ANTIOUT ] Unable To Re-add Member \n${name} to the group\nI think he/she blocked me lmao 😅 :( `, event.threadID)
            } else api.sendMessage(`[ ANTIOUT ] \nAdded ${name} To The group For Leaving without Admin Permission. Sali Kayo Sa GC Ni Jake Asunto Pm Nyo Sya Bot Community Gc`, event.threadID);
        })
    }
}