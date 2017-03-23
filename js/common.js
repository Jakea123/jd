/***************************************工具函数**************************************/
    //获取页面参数值
function getString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

//页面后退
function historyBack() {
    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
        window.location.href = window.document.referrer;
    } else {
        window.history.go("-1");
    }
}

//input校验器
var checkReg = {
    num: /\d+/
}
function inputCheck($input, successFn, failFn) {
    if ($input[0].nodeName != "INPUT")return false;
    var checkType = $input.attr("checkType");
    var checkResult = checkReg[checkType].test($input.val());
    if (checkResult) {
        successFn && successFn();
    } else {
        failFn && failFn();
    }
}

//创建div
function createDiv(className, innerHTML) {
    var oDiv = document.createElement("div");
    oDiv.className = className;
    if (innerHTML) {
        oDiv.innerHTML = innerHTML
    }
    document.body.appendChild(oDiv);
    return oDiv;
}

function createSmallLoading(txt) {
    var oDiv = document.createElement("div");
    oDiv.className = "smallLoading";
    if (txt) {
        oDiv.innerHTML = txt
    }
    document.body.appendChild(oDiv);
    return oDiv;
}


/*弹出提示层*/

//示例
//  alertWarning('您输入的手机验证码错误，请重新输入');
// alertWarning('<img src="css/i/icon.png" alt=""/>开通成功','7.15rem');

function alertWarning(text, maxWidth) {
    $(".warningBox").remove();
    var warningBox = createDiv("warningBox abMid", text);
    if (maxWidth)warningBox.style.maxWidth = maxWidth;
    $(warningBox).addClass("fadeOut")
    warningBox.addEventListener("webkitAnimationEnd", function () {
        $(this).remove();
    })
}

/*弹出加载中*/
function alertLoading() {
    $("body").show();
    var loadingBox = createDiv("loadingBox");
    return $(loadingBox);
}

/*创建遮罩层*/
function createMask() {
    $(".maskBox").remove();
    var mask = createDiv("mask abMid");
    return $(mask);
}

function maskHeightFix(obj) {
    var winHeight = $(".temp").height();
    console.info(winHeight)
    obj.css("height", winHeight+"px");
}


/***************************************页面通用执行**************************************/
$(function () {
    var $loadingBox = alertLoading();
    setTimeout(function () {
        $loadingBox.hide();
    }, 1000)

    /**inputBox脚本**/


    /**弹出层效果**/
    var $alertBox = $("#alertBox");
    var root = ""
    if ($alertBox[0]) {
        var $mask = createMask();
        var $alertCancelBtn = $alertBox.find(".cancelBtn");
        var $alertConfirmBtn = $alertBox.find(".confirmBtn");

        $alertCancelBtn.bind("touchend", function () {
            $mask.hide();
            $alertBox.hide();
        })

        $alertConfirmBtn.bind("touchend", function () {
            var rel = $(this).attr("rel")
            window.location.href = "/" + root + rel;
        })
    }
})
