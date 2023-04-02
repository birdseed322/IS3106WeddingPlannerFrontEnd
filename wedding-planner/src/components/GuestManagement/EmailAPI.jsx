const SERVER_PREFIX = "http://localhost:8080/IS3106WeddingPlanner-war/webresources/guestmanagement";
const EmailAPI = {
    async sendEmail(bride, groom, venue, date, rsvp, list) {
        return fetch(`https://api.elasticemail.com/v2/email/send?` +  new URLSearchParams({ 
                    apikey: "3E17C4814513FBE9D7B1B9DA5A45A4E025F48D680732DFD6685D596AF426F670A239C1203AEE09AFCB9A2A73AF7D6E26",
                    attachments : "",
                    bodyAmp : "",
                    bodyHtml:  "<div id = email style={justify-content: center, align-items : center, margin : auto, text-align: center, font-family: Garamond, max-width: 60%}> <h1>Wedding Invitation</h1>" +
                    "<h2> You are hereby invited to " + bride + " and " + groom +"'s wedding</h2><h2> Venue : "+ venue + "</h2><h2> Date : " + date + "</h2><h2> RSVP: " + rsvp +" </h2>  </div>",
                    bodyText: "",
                    channel: "",
                    charset: "",
                    charsetBodyAmp: "",
                    charsetBodyHtml: "",
                    charsetBodyText: "",
                    dataSource: "",
                    encodingType : 4,
                    from	: "leo.mike1356@gmail.com",
                    fromName	: "",
                    headers: "",
                    isTransactional: "",
                    lists: "",
                    merge : "",
                    mergeSourceFilename: "",
                    msgBcc: "",
                    msgCC: "",
                    msgFrom: "",
                    msgFromName: "",
                    msgTo : "",
                    poolName: "",
                    postBack: "",
                    replyTo: "",
                    replyToName: "",
                    segments: "",
                    sender: "",
                    senderName: "",
                    subject: "Wedding Invite from App",
                    template: "",
                    timeOffSetMinutes: "",
                    to: "leo.mike1356@gmail.com",
                    trackClicks: "",
                    trackOpens: "",
                    utmCampaign: "",
                    utmContent: "",
                    utmMedium: "",
                    utmSource: "",
                    })
                    , {
                    
                    method: "POST"

                    }).then(response => {
                        //clearTimeout(timer);                    
                        return response;
                    }).catch(error => {
                        //clearTimeout(timer);
                        throw error;
                    })
    }
}
export default EmailAPI;