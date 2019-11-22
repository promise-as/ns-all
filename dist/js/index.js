"use strict";

$(function () {
  /* 鼠标移入切换 */
  function mouseenterTab(headEle, parentEle, contEle, className) {
    $(headEle).mouseenter(function () {
      var $this = $(this);
      $this.parent().parent().find('li').removeClass(className);
      $this.addClass(className);
      $this.parents(parentEle).find(contEle).removeClass(className);
      $this.parents(parentEle).find(contEle).eq($this.index()).addClass(className);
    });
  }
  // 建筑类考试
  mouseenterTab(".box1-t .list li", ".qh", ".box1-cont", "active");
  // 精选考点
  mouseenterTab(".box1-c2 .list li", ".box1-c2", ".qhlist", "active");
  mouseenterTab(".ns-box5 .list li", ".qh", ".c", "active");
  mouseenterTab(".ns-footer-nav .tab-head li", ".ns-footer-nav", ".cont-item", "cur");

  // 功能完善的tab切换
  function tabHandle(headBox, parentBox, contBox, className) {
    $(headBox).mouseenter(function () {
      $(this).addClass(className).siblings().removeClass(className);
      $(this).parents(parentBox).find(contBox).removeClass(className);
      $(this).parents(parentBox).find(contBox).eq($(this).index()).addClass(className);
    });
  }
  tabHandle('.zs-team .tab-head span', '.zs-team', '.cont-item', 'cur');

  // 多选框
  function checkboxHandle(aimEle, className) {
    $(aimEle).click(function () {
      $(this).toggleClass(className);
    });
  }
  checkboxHandle('.zt-cont li', 'sel');
  checkboxHandle('.l-checkbox li', 'active');
  checkboxHandle('.zs-fd .row-xk span', 'sel');
  checkboxHandle('.detail-checkbox span', 'sel');
  // 提交答案
  $('#submit').click(function () {
    // console.log('选择的答案：', $('.zt-cont li.sel').find('span').text());
    $('#answer').val($('.zt-cont li.sel').find('span').text());
  });

  // 单选框
  function radioHandle(aimEle, className) {
    $(aimEle).click(function () {
      $(this).addClass(className).siblings().removeClass(className);
    });
  }
  radioHandle('.l-radio li', 'cur');
  radioHandle('.detail-radio span', 'sel');
  // 直播-列表页面 科目
  radioHandle(".ns-live-list .list-km li", "cur");

  $(".jt").click(function () {
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) {
      $(".xl").show();
    } else {
      $(".xl").hide();
    }
  });

  /* 滑动切换
     *   togBox:整个切换的盒子
     *   tagBox：切换按钮的盒子
     *   conBox：需要切换的div
     *   addclasses ：给切换按钮加上的class类名
  */
  function toggleTag(togBox, tagBox, conBox, addclasses) {
    $(togBox).each(function () {
      $(this).find(tagBox).children().eq(0).addClass(addclasses);
      $(this).find(conBox).children().eq(0).show().siblings().hide();
      $(this).find(tagBox).children().mouseenter(function () {
        var index = $(this).index();
        $(this).addClass(addclasses).siblings().removeClass(addclasses);
        $(this).parents(togBox).find(conBox).children().eq(index).show().siblings().hide();
      });
    });
  }
  toggleTag('.toggleMaxBox', '.toggleTag', '.toggleShowBox', 'active');
  toggleTag('.toggleMaxBox1', '.toggleTag1', '.toggleShowBox1', 'active');

  /* 文章折叠 */
  function clickFold() {
    // $(".foldbox").eq(0).find("ul").hide();
    // $(".foldbox").eq(0).find(".tag-title").addClass("active")
    $(".foldbox").each(function () {
      $(this).find(".tag-title").click(function () {
        $(this).parents(".foldbox").find("ul").slideToggle();
        $(this).toggleClass("active");
      });
    });
  }
  clickFold();

  function addColor() {
    $(".foldbox ul li").click(function () {
      $(this).addClass('active');
    });
  }
  addColor();

  /* SuperSlide */
  if ($(".teacher-slide").length) {
    // 过滤没有SuperSlide页面
    $(".teacher-slide").slide({
      mainCell: ".bd ul",
      effect: "leftLoop"
    });
  }

  // 搜索框失去焦点
  $('#text_one').focus(function () {
    $('#nsHot').show();
  });
  // 热门搜索推荐
  $('#nsHot li a').click(function () {
    $('#text_one').val($(this).text());
    $(this).parents('#nsHot').hide();
  });

  // 答题之后显示答案
  $('#answer').click(function () {
    if (!$(".zt-cont ul li.sel span").text()) {
      alert("您还没选择答案，请选择答案？");
      return null;
    }
    $("#selAnswer").text($(".zt-cont ul li.sel span").text());
    // 判断提交答案是否正确
    if ($(".zt-cont ul li.sel span").text() != $("#rightAnswer").text()) {
      $(".parse-sel .icon").addClass('icon-error');
    }
    $('.zt-parse').show();
  });

  // 关闭答题弹窗 只执行一次
  $("#tj").one("click", function () {
    $("#answerPopup").show();
  });
  $('.ns-close').click(function () {
    $("#answerPopup").hide();
  });

  // 招生页面的辅导方案切换
  function tabfd(aimEle, contEle, className, className2) {
    $(aimEle).each(function (aimIndex) {
      $(this).click(function () {
        $(this).addClass(className).siblings().removeClass('cur');
        $($(contEle)[aimIndex]).addClass(className2).siblings().removeClass(className2);
        $($(contEle)[aimIndex + 3]).addClass(className2).siblings().removeClass(className2);
        $($(contEle)[aimIndex + 7]).addClass(className2).siblings().removeClass(className2);
        $($(contEle)[aimIndex + 9]).addClass(className2).siblings().removeClass(className2);
        $($(contEle)[aimIndex + 13]).addClass(className2).siblings().removeClass(className2);
      });
    });
  }
  tabfd('.zs-fd .fd-head .head-item', '.zs-fd .cont-row .row-col', 'cur', 'nswap-bk');
});
/* 搜索框 */
function CheckForm() {
  if (document.search_one.text_one.value == "") {
    alert("请输入需要搜索的关键词");
    document.search_one.text_one.focus();
    return false;
  } else {
    var urlstr = encodeURI(document.search_one.text_one.value);
    //var city = document.search_one.citymk.value;
    var urlx = 'http://zhannei.baidu.com/cse/search?s=6924920297305690263&entry=1&q=' + urlstr;
    //document.search_one.action = urlx;
    //document.search_one.submit();
    window.open(urlx);
  }
  return false;
}