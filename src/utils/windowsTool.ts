export function getOsInfo() {
    var userAgent = navigator.userAgent.toLowerCase()
    var name = "Unknown"
    var version = "Unknown"
    var digit = "Unknown"
    if (userAgent.indexOf("win") > -1) {
        name = "Windows"
        if (userAgent.indexOf("windows nt 5.0") > -1) {
            version = "Windows 2000"
        } else if (
            userAgent.indexOf("windows nt 5.1") > -1 ||
            userAgent.indexOf("windows nt 5.2") > -1
        ) {
            version = "Windows XP"
        } else if (userAgent.indexOf("windows nt 6.0") > -1) {
            version = "Windows Vista"
        } else if (
            userAgent.indexOf("windows nt 6.1") > -1 ||
            userAgent.indexOf("windows 7") > -1
        ) {
            version = "Windows 7"
        } else if (
            userAgent.indexOf("windows nt 6.2") > -1 ||
            userAgent.indexOf("windows 8") > -1
        ) {
            version = "Windows 8"
        } else if (userAgent.indexOf("windows nt 6.3") > -1) {
            version = "Windows 8.1"
        } else if (
            userAgent.indexOf("windows nt 6.2") > -1 ||
            userAgent.indexOf("windows nt 10.0") > -1
        ) {
            version = "Windows 10"
        } else {
            version = "Unknown"
        }
    } else if (userAgent.indexOf("iphone") > -1) {
        name = "Iphone"
    } else if (userAgent.indexOf("mac") > -1) {
        name = "Mac"
    } else if (
        userAgent.indexOf("x11") > -1 ||
        userAgent.indexOf("unix") > -1 ||
        userAgent.indexOf("sunname") > -1 ||
        userAgent.indexOf("bsd") > -1
    ) {
        name = "Unix"
    } else if (userAgent.indexOf("linux") > -1) {
        if (userAgent.indexOf("android") > -1) {
            name = "Android"
        } else {
            name = "Linux"
        }
    } else {
        name = "Unknown"
    }

    if (userAgent.includes("x64")) {
        digit = "64"
    } else if (userAgent.includes("x32")) {
        digit = "32"
    } else {
        digit = "Unknown"
    }
    return { name, version, digit }
}

export function getBrowser() {
    var userAgent = navigator.userAgent //取得浏览器的userAgent字符串
    var browserVersion = ""
    var browserName = ""
    var isIE11 = userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/) // IE 11中userAgent已经不包含'msie'所以用'msie'不能判断IE 11
    var isOpera = userAgent.indexOf("Opera") > -1 //判断是否Opera浏览器
    var isIE =
        (userAgent.indexOf("compatible") > -1 &&
            userAgent.indexOf("MSIE") > -1 &&
            !isOpera) ||
        isIE11 //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Edg") > -1 //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1 //判断是否Firefox浏览器
    var isSafari =
        userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1 //判断是否Safari浏览器
    var isChrome =
        userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 //判断Chrome浏览器

    if (isIE) {
        browserName = "Internet Explorer"
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);")
        reIE.test(userAgent)
        var fIEVersion = parseFloat(RegExp["$1"])
        if (fIEVersion === 7) {
            browserVersion = "7"
        } else if (fIEVersion === 8) {
            browserVersion = "8"
        } else if (fIEVersion === 9) {
            browserVersion = "9"
        } else if (fIEVersion === 10) {
            browserVersion = "10"
        } else if (isIE11) {
            // IE 11中userAgent已经不包含'msie'所以用'msie'不能判断IE 11
            browserVersion = "11"
        } else {
            browserVersion = "6-"
        } //IE版本过低
    }
    if (isOpera) {
        let matchList = userAgent.match(/Opera\/([\d.]+)/)
        if (matchList) {
            browserVersion = matchList[1]
        }
        browserName = "Opera"
    } else if (isEdge) {
        let matchList = userAgent.match(/Edg\/([\d.]+)/)
        if (matchList) {
            browserVersion = matchList[1]
        }
        browserName = "Edge"
    } else if (isFF) {
        let matchList = userAgent.match(/Firefox\/([\d.]+)/)
        if (matchList) {
            browserVersion = matchList[1]
        }
        browserName = "Firefox"
    } else if (isSafari) {
        let matchList = userAgent.match(/Firefox\/([\d.]+)/)
        if (matchList) {
            browserVersion = matchList[1]
        }
        browserName = "Firefox"
    } else if (isChrome) {
        let matchList = userAgent.match(/Chrome\/([\d.]+)/)
        if (matchList) {
            browserVersion = matchList[1]
        }
        browserName = "Chrome"
    }
    return { name: browserName, version: browserVersion }
}
