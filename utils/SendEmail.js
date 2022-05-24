// import { Linking } from "react-native";
// import React from "react";
// import qs from "qs";
// import Communications from "react-native-communications";

// export async function SendEmail(to, subject, body, options = {}, setFetching) {
//   const { cc, bcc } = options;

//   let url = `mailto:${to}`;

//   // Create email link query
//   const query = qs.stringify({
//     subject: subject,
//     body: body,
//     cc: cc,
//     bcc: bcc,
//   });

//   if (query.length) {
//     url += `?${query}`;
//   }

//   console.log("\n\nURL TO BE OPENED: ", url, "\n\n");
//   // check if we can use this link
//   const canOpen = await Linking.canOpenURL(url);

//   if (!canOpen) {
//     throw new Error("Provided URL can not be handled");
//   }

//   return Linking.openURL(url);
// }
