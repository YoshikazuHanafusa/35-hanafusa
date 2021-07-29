'use strict';

//タブの切り替え
{
  $('.tab').on('click', function (event) {
    //    クリックしたon click　ときに動く設定

    $('.tabbox').addClass('hide');
    const pair = $(event.currentTarget).data('pair');
    $('#' + pair).removeClass('hide');
    //    クリックしたところの中身を表示させる設定


    $('.tab').removeClass('active');
    $(event.currentTarget).addClass('active');
    //  クリックしたところのタブの色を指定する
  });
}