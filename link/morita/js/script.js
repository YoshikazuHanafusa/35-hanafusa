'use strict';

/*-- topページスライダー ------------------------ */
const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: true,
    speed:1500,
    autoplay: {
        delay: 10000
    },
    effect: "fade",
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });



 /*
カーソルに追従するアニメーション
*/

CursorFollower(1,3);  //関数の使用

function CursorFollower(follower_num, delay_time){

  let $cursor = $('.cursor'),       //カーソルになる要素
      $follower = $('.follower'),   //カーソルを追従する要素
      cWidth = $cursor.width(),     //カーソルの横幅
      cHeight = $cursor.height(),   //カーソルの縦幅
      fWidth,                       //追従要素の横幅
      fHeight,                      //追従要素の縦幅
      fHTML = '',                   //追従要素のHTMLを格納する変数
      numFollow = follower_num,     //追従要素の個数
      mouseX = 0,                   //マウスの水平位置
      mouseY = 0,                   //マウスの垂直位置
      followX = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  //追従要素の水平位置
      followY = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  //追従要素の垂直位置
      delay = delay_time;           //追従時間※値が大きいとゆっくり追従

  //追従要素のHTMLを格納する変数に追従要素の個数分だけspanタグを格納    
  for(let i=0;i<numFollow;i++){     
    fHTML += '<span class="follower'+i+'"></span>'
  }
  $follower.html(fHTML);            //.followerに追従要素を格納

  let $followerSpan = $follower.find('span'); //追従要素

  fWidth = $followerSpan.width();             //追従要素の横幅を取得
  fHeight = $followerSpan.height();           //追従要素の縦幅を取得

  //マウス座標を取得
  $(document).on("mousemove", function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  //カーソルの遅延アニメーション
  //少しだけ遅延させる 0.001秒
  TweenMax.to({}, .001, {
    repeat: -1,   //リピート設定
    onRepeat: function() {    //コールバック関数
      $followerSpan.each(function(i){   //追従要素の位置を設定
        followX[i] += (mouseX - followX[i]) / (delay*(i+1));
        followY[i] += (mouseY - followY[i]) / (delay*(i+1));
        //追従要素のアニメーション
        TweenMax.set($(this), {
          css: {    
            left: followX[i] - (fWidth / 2),
            top: followY[i] - (fHeight / 2)
          }
        });
      });
      //カーソルのアニメーション
      TweenMax.set($cursor, {
          css: {    
            left: mouseX - (cWidth / 2),
            top: mouseY - (cWidth / 2)
          }
      });
    }
  });
}

//試し用　スライド
$('.slider').slick({
  autoplay: true,//自動的に動き出すか。初期値はfalse。
  autoplaySpeed: 3000,//次のスライドに切り替わる待ち時間
  speed:1000,//スライドの動きのスピード。初期値は300。
  infinite: true,//スライドをループさせるかどうか。初期値はtrue。
  slidesToShow: 1,//スライドを画面に3枚見せる
  slidesToScroll: 1,//1回のスクロールで3枚の写真を移動して見せる
  arrows: true,//左右の矢印あり
  prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
  nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
  dots: true,//下部ドットナビゲーションの表示
  pauseOnFocus: false,//フォーカスで一時停止を無効
  pauseOnHover: false,//マウスホバーで一時停止を無効
  pauseOnDotsHover: false,//ドットナビゲーションをマウスホバーで一時停止を無効
});

//スマホ用：スライダーをタッチしても止めずにスライドをさせたい場合
$('.slider').on('touchmove', function(event, slick, currentSlide, nextSlide){
  $('.slider').slick('slickPlay');
});