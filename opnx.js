"use strict";
// var htmlContent = ''

function MicAccessTool(o) {
    this.init = o || {
            link: "",
            contact: "",
            buttonPosition: "left",
            forceLang: ""
        },
        this.locale = {
            "he-IL": {
                btn_open: "תפריט נגישות",
                btn_close: "סגור",
                keyboard_root: "ניווט מקלדת",
                disable_animattions: "חסימת אנימציות",
                access_declaration: "הצהרת נגישות",
                debug_contacts: "דווח על בעיית נגישות",
                reset_all_settings: "בטל נגישות",
                image_without_alt: "תמונה ללא תיאור",
                contrast_block: {
                    header: "ניגודיות צבעים",
                    btn_monochrome: "תצוגת<br>מונוכרום",
                    btn_bright: "ניגודיות<br>בהירה",
                    btn_invert: "ניגודיות<br>הפוכה"
                },
                text_block: {
                    header: "גודל טקסט",
                    btn_font_up: "הגדלת<br>גופון",
                    btn_font_down: "הקטנת<br>גופון",
                    btn_font_readable: "גופון<br>קריא"
                },
                content_block: {
                    header: "הדגשת תוכן",
                    btn_underline_links: "הדגשת<br>קישורים",
                    btn_underline_headers: "הדגשת<br>כותרות",
                    btn_images_titles: "תיאור<br>לתמונות"
                },
                zoom_block: {
                    header: "הגדלת תצוגה",
                    btn_cursor_white: "סמן לבן<br>גדול",
                    btn_cursor_black: "סמן שחור<br>גדול",
                    btn_zoom_in: "הגדלת<br>תצוגה"
                }
            },
            "ru-RU": {
                btn_open: "Меню доступности",
                btn_close: "Закрыть",
                keyboard_root: "Навигация с клавиатуры",
                disable_animattions: "Блокировать анимацию",
                access_declaration: "Декларация доступности",
                debug_contacts: "Сообщить о проблеме",
                reset_all_settings: "Сбросить настройки",
                image_without_alt: "изображение без текста",
                contrast_block: {
                    header: "Цветовой контраст",
                    btn_monochrome: "монохр. дисплей",
                    btn_bright: "светлый контраст",
                    btn_invert: "инверт. контраст"
                },
                text_block: {
                    header: "Размер текста",
                    btn_font_up: "увелич. шрифта",
                    btn_font_down: "уменьш. шрифта",
                    btn_font_readable: "читаемый шрифт"
                },
                content_block: {
                    header: "Выделение содержимого",
                    btn_underline_links: "выдел. ссылки",
                    btn_underline_headers: "выдел. заголовки",
                    btn_images_titles: "названия картинок"
                },
                zoom_block: {
                    header: "Увеличение контента",
                    btn_cursor_white: "белый курсор",
                    btn_cursor_black: "черный курсор",
                    btn_zoom_in: "увелич. дисплея"
                }
            },
            en: {
                btn_open: "accessibility menu",
                btn_close: "close",
                keyboard_root: "keyboard navigation",
                disable_animattions: "block animations",
                access_declaration: "accessibility statement",
                debug_contacts: "report an accessibility problem",
                reset_all_settings: "reset settings",
                image_without_alt: "image without text",
                contrast_block: {
                    header: "color contrast",
                    btn_monochrome: "uncolored<br>display",
                    btn_bright: "bright<br>contrast",
                    btn_invert: "reverse<br>contrast",
                    btn_mono1: " other<br>color"
                },
                text_block: {
                    header: "text size",
                    btn_font_up: "increase<br>text",
                    btn_font_down: "decrease<br>text",
                    btn_font_readable: "readable<br>text"
                },
                content_block: {
                    header: "highlighting content",
                    btn_underline_links: "underline<br>links",
                    btn_underline_headers: "underline<br>headers",
                    btn_images_titles: "images<br>titles",
                    btn_highlight_links: "highlight<br>links",
                    btn_headers_links: "page<br>structure"
                },
                zoom_block: {
                    header: "zoom in",
                    btn_cursor_white: "big white<br>cursor",
                    btn_cursor_black: "big black<br>cursor",
                    btn_zoom_in: "zoom<br>screen"
                }
            }
        },
        this.currentLanguage = this.locale[this.init.forceLang] || this.locale.en,
        this.checkLanguageBox(),
        this.buildToolBox(),
        this.toolBox = document.getElementById("mic-access-tool-box"),
        this.toolBoxOpenButton = document.getElementById("mic-access-tool-general-button"),
        this.toolBoxCloseButton = document.getElementById("mic-access-tool-box-close-button"),
        this.toolBoxOpenButton.addEventListener("click", this.openBox.bind(this)),
        this.toolBoxCloseButton.addEventListener("click", this.closeBox.bind(this)),
        document.addEventListener("keyup", this.openCloseBoxKeyboard.bind(this)),
        this.micContrastMonochrome = document.getElementById("mic-toolbox-contrast-monochrome"),
        this.micContrastSoft = document.getElementById("mic-toolbox-contrast-soft"),
        this.micContrastHard = document.getElementById("mic-toolbox-contrast-hard"),
        this.micContrastMonochrome.addEventListener("click", this.contrastChange),
        this.micContrastSoft.addEventListener("click", this.contrastChange),
        this.micContrastHard.addEventListener("click", this.contrastChange),
        this.micContrastMono1 = document.getElementById("mic-toolbox-contrast-mono1"),
        this.micContrastMono1.addEventListener("click", this.contrastChange),
        this.micDisableButtonsAnimations = document.getElementById("mic-toolbox-disable-buttons-animations"),
        this.micDisableButtonsKeyboard = document.getElementById("mic-toolbox-disable-buttons-keyboard"),
        this.micDisableButtonsAnimations.addEventListener("click", this.onceButtonChange),
        this.micDisableButtonsKeyboard.addEventListener("click", this.onceButtonChange),
        this.micToolboxFontsUp = document.getElementById("mic-toolbox-fonts-up"),
        this.micToolboxFontsDown = document.getElementById("mic-toolbox-fonts-down"),
        this.micToolboxFontsSimple = document.getElementById("mic-toolbox-fonts-simple"),
        this.micToolboxFontsUp.addEventListener("click", this.fontsChange),
        this.micToolboxFontsDown.addEventListener("click", this.fontsChange),
        this.micToolboxFontsSimple.addEventListener("click", this.onceButtonChange),
        this.micToolboxContentLinks = document.getElementById("mic-toolbox-content-links"),
        this.micToolboxContentHeaders = document.getElementById("mic-toolbox-content-headers"),
        this.micToolboxContentImages = document.getElementById("mic-toolbox-content-images"),
        this.micToolboxContenthighlight = document.getElementById("mic-toolbox-content-highlight"),
        this.micToolboxheaderLinks = document.getElementById("mic-toolbox-headers-links"),
        this.micToolboxContentLinks.addEventListener("click", this.onceButtonChange),
        this.micToolboxContentHeaders.addEventListener("click", this.onceButtonChange),
        this.micToolboxContentImages.addEventListener("click", this.onceButtonChange),
        this.micToolboxContenthighlight.addEventListener("click", this.onceButtonChange),
        this.micToolboxheaderLinks.addEventListener("click", this.pageStructure),
        this.micToolboxCursorWhite = document.getElementById("mic-toolbox-cursor-big-white"),
        this.micToolboxCursorBlack = document.getElementById("mic-toolbox-cursor-big-black"),
        this.micToolboxZoomUp = document.getElementById("mic-toolbox-zoom-up"),
        this.micToolboxCursorWhite.addEventListener("click", this.cursorChange),
        this.micToolboxCursorBlack.addEventListener("click", this.cursorChange),
        this.micToolboxZoomUp.addEventListener("click", this.onceButtonChange),
        this.micToolboxDisableButtonsAll = document.getElementById("mic-toolbox-disable-buttons-reset-all"),
        this.micToolboxDisableButtonsAll.addEventListener("click", this.resetApp.bind(this)),

        this.initialApp()
}

MicAccessTool.prototype.checkLanguageBox = function() {
    if (!this.init.forceLang) {
        var o = document.body.parentElement;
        if (o.hasAttribute("lang")) {
            var A = o.lang;
            this.currentLanguage = this.locale[A] || this.locale.en
        } else this.currentLanguage = this.locale.en
    }
}

,
MicAccessTool.prototype.buildToolBox = function() {
    var o = this.currentLanguage || this.locale.en,
        A = '<button title="' + o.btn_open + '" tabindex="1" id="mic-access-tool-general-button" class="mic-access-tool-general-button"><div><span>CTRL+F2</span> <img src="data:image/png;base64,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" alt="' + o.btn_open + '"></div> </button><div id="mic-access-tool-box" class="mic-access-tool-box"><div class="mic-access-tool-box-header">opnx toolbox <button title="' + o.btn_close + '" id="mic-access-tool-box-close-button">&#10007; - ' + o.btn_close + '</button></div><div class="mic-disable-buttons"> <button title="' + o.keyboard_root + '" id="mic-toolbox-disable-buttons-keyboard"><span>' + o.keyboard_root + '</span> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAP1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACzJYIvAAAAFHRSTlMAAQIEBQYLhomeoLW31dna3Oj5+90/ykwAAABVSURBVBgZncFJEoJQEAXBeg3i+FHbuv9ZjWAFS83kD2cPrjhnT6wQEkIIYnXuvAbv9LwiVopACMsTsdqpk2ZdHIgVUpsQxOo83HymgXiqPbl4cON3X+q6BbAaNKDxAAAAAElFTkSuQmCC" alt="' + o.keyboard_root + '"></button> <button title="' + o.disable_animattions + '" id="mic-toolbox-disable-buttons-animations"><span>' + o.disable_animattions + '</span> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQLyYwAAAAE3RSTlMABwoNDxAcIS84PkBBVGR7guj3cqQiVwAAAFxJREFUGNNlz9sOgCAMA9AiIioKav//Xx2XIGAfluwkSzpAoY963CCOo1xRjETn/SRFnEyuwAJ4VtkQfIEse2CFJDcbKFcNZGkhSQdRfO7xySTNZlOiD/7/soNYvHcOCRT6qv0LAAAAAElFTkSuQmCC" alt="' + o.disable_animattions + '"></button></div><div id="mic-toolbox-contrast-block" class="mic-contrast-block mic-buttons-block"><span class="mic-subtitle-span">' + o.contrast_block.header + '</span> <button title="' + o.contrast_block.btn_monochrome + '" id="mic-toolbox-contrast-monochrome"><span><img alt="' + o.contrast_block.btn_monochrome + '" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAOVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC8dlA9AAAAEnRSTlMAAQkLT1BRkpSVl5iam8zP7/E3Z1DDAAAAc0lEQVQokZWSSRaAIAxDG3FAEJXc/7BuVAbrlCX/vTRpEXkXrIX67kinEASSnErCSt8BTB9VICLNkgHkFk0kkec5LfojG3w51HDvY6s0IMnhDtgnq3p4lxZzF7csOKvNTbv+W+IFpGxBO6HXTyuCUf8MlTaTLhCpbG3L9gAAAABJRU5ErkJggg=="> </span><span>' + o.contrast_block.btn_monochrome + '</span></button> <button title="' + o.contrast_block.btn_bright + '" id="mic-toolbox-contrast-soft"><span><img alt="' + o.contrast_block.btn_bright + '" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAARVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADc6ur3AAAAFnRSTlMAAQgJCgtOT1BRkpSVl5iam8jMz+/x9WwUowAAAI1JREFUKJGNktsSwiAMRLNSehGrtdLz/5/qg2WwTBy7T4EzE5ZNzP5LKcm9n2F2iBaAx5HQ6BzYxijFaWvBGj5leH0BQQ7lEDZQ9TNUJ1PxpjsQK4js/0mH58wEcP0FUmnVOa1MC/QVjDUYQb44ds2A507C2kaS+84sDvl8iC4o3mDxRnj3R2umm78Mjd4oPA952m8bgAAAAABJRU5ErkJggg=="> </span><span>' + o.contrast_block.btn_bright + '</span></button> <button title="' + o.contrast_block.btn_invert + '" id="mic-toolbox-contrast-hard"><span><img alt="ניגודיות הפוכה" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAV1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOl5NtAAAAHHRSTlMAAQUICQoLTk9QUXN0kpSVl5iam8jMz9re4O/xs7FJiwAAAKNJREFUKJGNktsOgzAMQ53Sles6GGNA8f9/5x4K6qgyDT9VPVLixAH+S7wX9b8ne4XISJLPM2Gma2CrnYhrthxMNj7t+wsIGSxMuyytgd1ISX4qmJkkZ4Pm8CYDSYcu9m3huM/jY7s1ggVCkvdfwB+lbkopyEiWqXmdFiNkKGC6de1OdgGSr2IfcMpXEsob4KpwfYkqSEGNWoSDHi0gD/0YMn0A2QIYmULugckAAAAASUVORK5CYII="> </span><span>' + o.contrast_block.btn_invert + '</span></button> <button title="' + o.contrast_block.btn_mono1 + '" id="mic-toolbox-contrast-mono1"><span><img alt="' + o.contrast_block.btn_mono1 + '" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAOVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC8dlA9AAAAEnRSTlMAAQkLT1BRkpSVl5iam8zP7/E3Z1DDAAAAc0lEQVQokZWSSRaAIAxDG3FAEJXc/7BuVAbrlCX/vTRpEXkXrIX67kinEASSnErCSt8BTB9VICLNkgHkFk0kkec5LfojG3w51HDvY6s0IMnhDtgnq3p4lxZzF7csOKvNTbv+W+IFpGxBO6HXTyuCUf8MlTaTLhCpbG3L9gAAAABJRU5ErkJggg=="> </span><span>' + o.contrast_block.btn_mono1 + '</span></button></div><div class="mic-fonts-block mic-buttons-block"><span class="mic-subtitle-span">' + o.text_block.header + '</span> <button title="' + o.text_block.btn_font_up + '" id="mic-toolbox-fonts-up"><span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAUVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcqRVCAAAAGnRSTlMAAQIEBwkKCxQgIyU2RlthYmN3mqbD3N75/ffAjZwAAABwSURBVBhXbc1XEoAgDATQxYJdsSLc/6AWigTJB7P7hgDgpuzxGy61SJiO9bEz0sdEJYlyU3movgSaii5MB/elsCa0llZH1MqZ1xVoBntvMVrOzHxgdu0LCA1Ev5xK6R3XWmKv7mAbsVtVd58Z6OS4AOceDZR02LMoAAAAAElFTkSuQmCC" alt="' + o.text_block.btn_font_up + '"> </span><span>' + o.text_block.btn_font_up + '</span> <span id="mic-toolbox-fonts-up-enabled"></span></button> <button title="' + o.text_block.btn_font_down + '" id="mic-toolbox-fonts-down"><span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAUVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcqRVCAAAAGnRSTlMAAQIEBwkKCxQgIyU3RlthYmN3mqbD3N75/WrPbOoAAABvSURBVBhXbcvZFoMgDEXRo610UpuO1Pz/h/oQoEThJefutQB6/DtA947BmSw3rqpORfUD4jSvWv/dqvafvCq7TEmfZsOj47yomJqFqC+OUbMm09mOAPdvMoEq2llZGc7SPHkz/W3MdGsQ4t5gGEuuW74NlKW6ljMAAAAASUVORK5CYII=" alt="' + o.text_block.btn_font_down + '"> </span><span>' + o.text_block.btn_font_down + '</span></button> <button title="' + o.text_block.btn_font_readable + '" id="mic-toolbox-fonts-simple"><span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAALVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADBoCg+AAAADnRSTlMABAYLDhAeKkBbZ5G32sGB+xIAAAA8SURBVAhbY2BgYDwDBscYGBiY3oHBc1QmEPC+g9DEM9cAjWyAMPcBzZmAwWTgewPXRlUmazADA0sokAEAvoY2e1eb61QAAAAASUVORK5CYII=" alt="' + o.text_block.btn_font_readable + '"> </span><span>' + o.text_block.btn_font_readable + '</span></button></div><div class="mic-content-block mic-buttons-block"><span class="mic-subtitle-span">' + o.content_block.header + '</span> <button title="' + o.content_block.btn_underline_links + '" id="mic-toolbox-content-links"><span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAA81BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYh4bhAAAAUHRSTlMAAQIDBAUHCAoLDA0ODxATFRgcJCUnKCorLDc4OjxBQ0ZLTE9XW2FjZ3V5foKIjJKVmJqbnZ6jq62yub7AxcjKzM/V2tze4ujp7e/z9fn7/dE+l70AAADFSURBVBgZ1cHpQgFhGIbhZ/SpsbQorUqJUhHttEiZKCT3+R9Nw1/v/Oe6NP+8s05QVBTvidCVItzSy+z9cSFTgf6qtAunsrTJKpRn7MvQZV0TNxzIcMlHXKqcP3AkgwtoOQWAL4vf4zVdhrrczv6yZqR+mKoOYJTXjJV6/2XrBGg+QkmmTaCkApRladDmSzqEYxm+SW6vScrRleGOqibSjGRI/VLzpHiLa1kyQ+6XEp+8O5k2BoTenCIknxlXYooW87QI/gGkVyJRaE/etAAAAABJRU5ErkJggg==" alt="' + o.content_block.btn_underline_links + '"> </span><span>' + o.content_block.btn_underline_links + '</span></button> <button title="' + o.content_block.btn_underline_headers + '" id="mic-toolbox-content-headers"><span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcBAMAAACAI8KnAAAAIVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABt0UjBAAAACnRSTlMAARAeQEFSkZvvep8Y0AAAAElJREFUGJVjYKAmYHFxcVEAE2Au16pVqxzABDYug8QqAygBBqyrYATErFUwgiguGODkAp3kTp7JbKsEoARYMnNVqwKYIMaDVAIAmsgu7kDEZosAAAAASUVORK5CYII=" alt="' + o.content_block.btn_underline_headers + '"> </span><span>' + o.content_block.btn_underline_headers + '</span></button> <button title="' + o.content_block.btn_images_titles + '" id="mic-toolbox-content-images"><span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAgVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABtFS1lAAAAKnRSTlMAAQMEBQgQHyIkJi9DRElbXmtscHN3e4WIiYuSl52go7C1usDo6evx9flG5RBaAAAAfUlEQVQoz93SSRKCQAxA0UTBWVFQnGVQUf79D+jKotvuXrjlr1J5VVlFpNdt3+1PlRrMKrYbMzJ52s16eKQyDPICmIV5GeLBOhIRPT0z7/Eb5Xfh4QTYBHkCwFz3V/Vw3ADACy4ua03X0eEdZnlkc4Hd2Wa3Pzh39K79fuEPdQoeE+qkypwAAAAASUVORK5CYII=" alt="' + o.content_block.btn_images_titles + '"> </span><span>' + o.content_block.btn_images_titles + '</span></button> <button title="' + o.content_block.btn_highlight_links + '" id="mic-toolbox-content-highlight"><span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAADJElEQVRIx62XTU8TQRjHN9GLevLtYowH3VYCajQhHjx51UQ/RI1GE8XovWiMIYIe/AwqHKoHI+1uS2sr1njBCOxsKUUjGGgrYPDtaGV8/tPdtba7dHfKk0y63ZnOr8/L/PdZRQlgqvZ+b1g3zqoai6ia0V8fLIJ74dHSHmUz7Vhqekcoya6HdPN1SGc1Gtxj1GjdOH327Rt9t10aeDqX20obXaaNKhvAPIZRpihcwh6BoD3Jwi7yMBMc2DQoAkiPL2hXYipMP/rYMdQeGps7ODYT8uEp+yAL6UqaXnOfPIsP+QjrLCsLfLa0xv+sc65Vv/MjKdc/kFZisS0uR4VdkYW+qHzjjZZf/cWPjhVa1oY182LrkZGoXkAT5CHsfukLP54u8OzKT/F9nOAunlfAcsD1cyoPvTdbde53E+zlch2uV3+4Fdu1f2Cd5TcDao9T2aKYq62vuxXcKwFFtbVRpJZxq1AWG8cW1/jJ+ASP5id57+iEM/9wblnMP6V5N4UTFQ6dDRrmgWJFbPyoOM8nq6viGnDMDVEEYIiI1/FS9cJ5RdXZBb/hvU2eDhSrvDczwx8TdNqCAg7P/UBFdevGTQVPGD9QzcopbKT0mWAr4potf+UjswvOkWoHrReYeYcq2oj6hSKnw6UFPmV5CuiT4oLzh3xBbfBGoW6EDlIYEU47pwgzwo2wI+f9Ztkf1A51WDPOtDsyg9aRieannJwOz86La+Q8aHGqmnlO6coUd9OX382T0F7YA1Ik+x6OTPTNpPD8ebmeU3gaEFxzHhhW5+BMHk4ycfhJ8/mJdKvmDlrVq/nN6X9hZtlG5eprXpCo1MMM7e1u0NyhDqACnDSuOuD9sbfb6OZi44IeguUswYf2QgZtRZKFoiVq6cfQIzUvhKcZS/Btg/DLQVFULOLe3NHDunkxPI9T2JFzaK8slEbKtRGAHYgbO9EjeRSFdN+l6mYJe2/Yd6Ex84LLQg8lC6qvTlN47hJ2mfC29bTFKB/okVCJEsAlSLFnTv0Yyh/tCjqHtq8wOsvhnHb0CuPa7JO84iGu6sYNUru7GLiG9mIuyF5/AZ62ybEg1uZMAAAAAElFTkSuQmCC" alt="' + o.content_block.btn_highlight_links + '"> </span><span>' + o.content_block.btn_highlight_links + '</span></button> <button title="' + o.content_block.btn_headers_links + '" id="mic-toolbox-headers-links"><span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAQAAACROWYpAAAAAmJLR0QA/4ePzL8AAAEXSURBVEjH1dW7K8VxGMfxl+NSklyjdFyiXGIzyUAYDBQiJcoRRyl2owzOZhAlA1IG8g/4Tyi3Sep0NpPF4Df8hsP5UZw87+nzrXd9bz0P4YqpykmBrBX36C4H927VZJMXHMhd58azLS/ajSAfm/g1edS1eoOSAYPKLElqjyKvSotLSAUk1NmRMvDr26b45/K6V+02HIaYiyoPuVKu10yIrj95qnzKrT+X16Q1OpUJONHiRcZKFHlSUndezlxqCh1GQjRHlfe96bPpIsRyVLlBq/L/+EnyIcdsYUWTHrPYRkKbTvNB+kIu8YRL/abt4Rlnho05CtIn8kfTr0W1mGIVQapSqEhlkD5p+nEPEcbNjersl/HNQfcONDeEkjjOH4oAAAAASUVORK5CYII=" alt="' + o.content_block.btn_headers_links + '"> </span><span>' + o.content_block.btn_headers_links + '</span></button><div id="myModal" class="modal" style="display: none!important;position: fixed !important;z-index: 1 !important;padding: 20% 0px !important; left: 0px!important; top: 0px !important;width: 100% !important;height: 100% !important;overflow: auto !important;background-color: rgb(0,0,0)!important; background-color: rgba(0,0,0,0.4) !important;align-items: center;justify-content: center; flex-direction: column"><div class="modal-content" style="display:flex; flex-grow:1; flex-direction:column; position: relative!important; background-color: #fefefe!important; margin: 0!important; padding: 0!important; border: 1px solid #888!important; border-radius:2%; width: 90%!important; max-width:600px!important; box-shadow: 0 4px 8px 0 rgba(0,0,0,.2), 0 6px 20px 0 rgba(0,0,0,.19)!important; -webkit-animation-name: animatetop!important; -webkit-animation-duration: 0.4s!important; animation-name: animatetop!important; animation-duration: 0.4s!important"><div class="modal-header" style="padding: 1% 3% !important;background-color:rgb(92, 184, 92) !important; color: white !important; height: 51px; border-top-left-radius : 8px; border-top-right-radius: 8px"> <span id="myClose" class="close" style=" color: white !important;float: right !important;font-size: 200%;font-weight: bold !important;width: 1px;height: 15px;">&times;</span><div id="myText" class="modal-text">Page Structure</div></div><div class="modal-body " style="flex-grow: 1;display: flex;flex-direction: column; "><div class="tab"> <button id="headings-01" class="tablinks" onclick="openTab(event,\'Headings\')"> Headings</button> <button id="links-01" class="tablinks" onclick="openTab(event,\'Links\')">Links</button></div><div id="Headings" class="tabcontent"><ul class="hli" id="headlist"></ul></div><div id="Links" class="tabcontent"><ul class="lili" id="linkList"></ul></div></div><div class="modal-footer " style="padding: 2px 16px!important; background-color: #5cb85c!important; color: white!important; font-size: 20px!important;flex: none; border-bottom-right-radius: 8px; border-bottom-left-radius: 8px; text-align: right;"></div></div></div><style>p{font-size:20px!important}h1,h2,h3,h4,h5,h6{font-size:20px!important}.modal-text{padding:8px 20px !important;background-color:#5cb85c !important;color:white !important;font-size:200% !important;font-weight:500 !important}.tab{overflow:hidden!important;border:1px solid #ccc!important;background-color:#f1f1f1!important;display:flex;justify-content:space-between;flex:none;height:50px!important}.tab button{background-color:inherit!important;height:50px!important;float:left!important;border:none!important;outline:none!important;cursor:pointer!important;padding:1% 9% !important;transition:0.3s !important;font-size:17px !important;flex:1 !important;margin-right:1%}.tab button:hover{background-color:#ddd!important}.tab button.active{background-color:#ccc!important}.tabcontent{display:none;padding:6px 12px!important;border:1px solid #ccc!important;border-top:none!important;flex-grow:1;height:350px;text-align:left;line-height:1.6!important;font-size:18px!important;overflow-x:hidden;overflow-y:scroll} .tabcontent li{text-align:left;line-height:2.2!important;font-size:18px!important}.tabcontent li:hover,.tabcontent li:focus{background:#5cb85c!important;color:#fff!important;}.headBlock{font-size:18px!important;font-weight:400;text-transform:uppercase;background:#1e242a;opacity:.8;border-radius:5px;padding:4px 0;width:20px;color:#fff;margin:0 8px}.headName{text-align:left;font-size:18px!important;width:auto!important}.linkName{text-align:left;font-size:18px!important;width:max-content}.linkBlock{opacity:.8;padding:4px 0;margin:0 8px}@-webkit-keyframes animatetop{from{top:-300px;opacity:0}to{top:0;opacity:1}}@keyframes animatetop{from{top:-300px;opacity:0}to{top:0;opacity:1}}.close:hover,.close:focus{color:#000!important;text-decoration:none!important;cursor:pointer!important}</style></div><div class="mic-cursors-block mic-buttons-block"><span class="mic-subtitle-span">' + o.zoom_block.header + '</span> <button title="' + o.zoom_block.btn_cursor_white + '" id="mic-toolbox-cursor-big-white"><span><img alt="' + o.zoom_block.btn_cursor_white + '" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAS1BMVEW9w8e+xMi/xMi/xcnCx8vCyMvIzdHL0NPS1tnT19nd4OLe4ePf4uTg4+Xq7O3s7u/x8vPx8/P19vf4+fn6+/v8/f3+/v7+//////+Nje9qAAAAXklEQVQoz83SNwKAMBADwTPJ5GDS/v+lFFByomXbaVTI7P/lmvdOMnSapaMd7Wi/mV6z52hHO9of2lJKS3B5EMtHODOXYzig8TiatbC+8xzNrAAq85sgCi7rj1P9pwslQQsBoORDzQAAAABJRU5ErkJggg=="> </span><span>' + o.zoom_block.btn_cursor_white + '</span></button> <button title="' + o.zoom_block.btn_cursor_black + '" id="mic-toolbox-cursor-big-black"><span><img alt="' + o.zoom_block.btn_cursor_black + '" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAWlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACLSV5RAAAAHXRSTlMAAQMEBgcTFCw3OFBUe3+AgoOIrbfHytrk7fX7/WJfHrcAAABoSURBVChTzdK7FoIwFAXRy1MSEXxHhfn/37SIK43JoWXa3Y7Z/us0fybJIB3tALNm4WiPzFlzydGemIvmrP/oHUJ41kW+/kviG6xtkX2zwFhib3aCV5XlhzOzHhiyHLuDE3w4bky1n75vow1/sgwkQQAAAABJRU5ErkJggg=="> </span><span>' + o.zoom_block.btn_cursor_black + '</span></button> <button title="' + o.zoom_block.btn_zoom_in + '" id="mic-toolbox-zoom-up"><span><img alt="' + o.zoom_block.btn_zoom_in + '" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAA51BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACWqgEeAAAATHRSTlMAAQIEBwgJCgwQGBkaISkqKywwMTM0Nzg/QEFCRUdNTlZdXnFzdHV3eXuRlJeYmp6goqOoqq2vsLLFx8jKzNrc3uDi6Onr7fHz9ff5oUSo3wAAAOJJREFUGBnVwelCAVEAhuF35mSZooW2U2lPiTYlTgtCDfXd//U0+HWUC/A8LIJw964dv13l+VdhoKlWir+Opfh8a22/LvUjZhWkqmEs11PH4AsHqgLZyEDmS2V8VrEBnCywIxk89zoj4WSB4FvreDraJOvcj3quBs86xDPUKpEmHNzqBM+79jDW9nRti/CiAzwV1Uk4WWBJWsaTl1aAmisCZbWZ0dJHhqmS1Ajwpfv63A6AVEWJhwBf1JVGjZtXTT2G+MylJjoNjV0wy2wcnZZyBHUlhswTPElqMldYGTXTLLhf0gcqXp6DTJoAAAAASUVORK5CYII="> </span><span>' + o.zoom_block.btn_zoom_in + '</span></button></div><div class="link-access-page"><a class="atb-hide-ifempty" title="' + o.access_declaration + '" id="mic-toolbox-link-nagishut" href="#" target="_blank">' + o.access_declaration + '</a> <a class="atb-hide-ifempty" title="' + o.debug_contacts + '" id="mic-toolbox-link-contact" href="#">' + o.debug_contacts + '</a> <button title="' + o.reset_all_settings + '" id="mic-toolbox-disable-buttons-reset-all"><span>' + o.reset_all_settings + '</span> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAmVBMVEUAAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAAC9qi4cAAAAMnRSTlMAAQUGBwgNDg8QExUXGRojJiwvNTo7PFdYXF1hYmNnaGlwdHt+j5GSx9fZ2tzg8/X5+2glG4cAAAB3SURBVAgdbcHZAkJQAEXRLU0olUbSrNIkzv9/XNzrsbX4w788izzt0UpllHOMrarN0A0yaULNUxXSWOrjACclWHfNgIc8rEhHQOrQGJWqRbzlYUwlxXBWgrXSFfBVhVgLh9pB5XrQHd92tPYyij6tIHt989jlnx+BHA122Bbd9AAAAABJRU5ErkJggg==" alt="' + o.reset_all_settings + '"></button></div><div dir="ltr" class="mic-toolbox-all-credits"><span>learn more about</span>&nbsp;&nbsp;<a class="wtu"target="_blank" id="about" href="http://webworks.ga/acc_toolbar">toolbox</a></div></div>',
        t = document.createElement("style");
    t.textContent = '#mic-init-access-tool button{border:none;outline:0;-webkit-box-shadow:none;box-shadow:none;background:0 0;border-radius:0;color:#333}#mic-init-access-tool img{display:inline-block!important}#mic-init-access-tool a{outline:0;display:inline-block;color:#333;width:100%;line-height:1}#mic-init-access-tool a:focus,#mic-init-access-tool a:hover{color:#8b0000;border-color:#8b0000;background-color:#ffc}#mic-init-access-tool a:focus span,#mic-init-access-tool a:hover span{color:#8b0000}#mic-init-access-tool .atb-hide-if-empty{display:none!important}#mic-init-access-tool span.mic-toolbox-images-titles{display:none!important}#mic-init-access-tool *>:not(#myText){font-size:14px;font-family:Arial,Helvetica,sans-serif!important;text-decoration:none!important;-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important;line-height:1;-webkit-transition:none!important;transition:none!important}#mic-init-access-tool .mic-access-tool-general-button{position:fixed!important;z-index:99999!important;display:block!important;bottom:7px;left:7px;background-color:#0897f0;cursor:pointer;border:solid 2px #fff;border-radius:4px 4px 20px 4px;color:#fff;padding:0}#mic-init-access-tool .mic-access-tool-general-button>div{font-size:0!important;position:relative;text-align:center;padding:4px 6px!important}#mic-init-access-tool .mic-access-tool-general-button>div span{display:block;margin-bottom:4px;line-height:1;font-weight:700;font-size:11px!important;font-family:Arial,Helvetica,sans-serif!important}#mic-init-access-tool .mic-access-tool-general-button>div img{display:inline-block;max-width:32px}#mic-init-access-tool .mic-access-tool-general-button.mic-access-tool-general-button-right{left:auto;right:7px;border-radius:4px 4px 4px 20px}#mic-init-access-tool .mic-access-tool-general-button:focus,#mic-init-access-tool .mic-access-tool-general-button:hover{color:#8b0000;border-color:#8b0000;background-color:#000108}#mic-init-access-tool .mic-access-tool-general-button:focus span,#mic-init-access-tool .mic-access-tool-general-button:hover span{color:#8b0000}#mic-init-access-tool .mic-access-tool-box{color:#333;overflow-y:auto;-webkit-box-shadow:1px 0 4px 0 #777;box-shadow:1px 0 4px 0 #777;position:fixed;height:100vh;width:320px;top:0;left:0;background-color:#033;z-index:9999999;visibility:hidden;opacity:0;-webkit-transition:opacity .4s!important;transition:opacity .4s!important}#mic-init-access-tool .mic-access-tool-box>div:not(.mic-access-tool-box-header):not(.mic-toolbox-all-credits){position:relative;background-color:#fff;max-width:96%;margin:0 auto 5px;text-align:center}#mic-init-access-tool .mic-access-tool-box>div:not(.mic-access-tool-box-header):not(.mic-toolbox-all-credits) .mic-subtitle-span{font-size:20px!important;display:block;padding:12px 0;text-align:center;color:#8b0000;font-variant:small-caps}#mic-init-access-tool .mic-access-tool-box.opened-mic-access-tool{visibility:visible;opacity:1}#mic-init-access-tool .mic-access-tool-box.mic-access-tool-box-right{left:auto;right:0}#mic-init-access-tool .mic-access-tool-box .mic-access-tool-box-header{position:relative;text-align:left;text-transform:uppercase;line-height:1.2;font-size:14px!important;font-weight:700;padding:10px;color:#fff}#mic-init-access-tool .mic-access-tool-box .mic-access-tool-box-header button{position:absolute;display:inline-block;cursor:pointer;color:#fff;font-weight:700;line-height:1.1;font-size:18px!important;right:0;top:0;padding:8px 5px 8px}#mic-init-access-tool .mic-access-tool-box .mic-access-tool-box-header button *{font-size:18px!important}#mic-init-access-tool .mic-access-tool-box .mic-access-tool-box-header button:focus,#mic-init-access-tool .mic-access-tool-box .mic-access-tool-box-header button:hover{color:#8b0000;background-color:#ffc}#mic-init-access-tool .mic-access-tool-box .mic-access-tool-box-header button:focus span,#mic-init-access-tool .mic-access-tool-box .mic-access-tool-box-header button:hover span{color:#8b0000}#mic-init-access-tool .mic-access-tool-box .link-access-page{background-color:#fff;position:relative;height:auto;text-align:center;max-width:96%;margin-top:10px!important;margin-bottom:20px!important}#mic-init-access-tool .mic-access-tool-box .link-access-page a{padding:10px 0;border-bottom:1px solid #777}#mic-init-access-tool .mic-access-tool-box .link-access-page *{font-size:18px!important}#mic-init-access-tool .mic-access-tool-box .link-access-page #mic-toolbox-disable-buttons-reset-all{text-align:center;font-weight:700}#mic-init-access-tool .mic-access-tool-box .link-access-page button,#mic-init-access-tool .mic-access-tool-box .mic-disable-buttons button{position:relative;padding:12px 5px;border-bottom:1px solid #777;display:block;width:100%;font-size:18px!important}#mic-init-access-tool .mic-access-tool-box .link-access-page button img,#mic-init-access-tool .mic-access-tool-box .link-access-page button span,#mic-init-access-tool .mic-access-tool-box .mic-disable-buttons button img,#mic-init-access-tool .mic-access-tool-box .mic-disable-buttons button span{display:inline-block;vertical-align:middle;font-size:18px!important;color:#333}#mic-init-access-tool .mic-access-tool-box .link-access-page button:focus,#mic-init-access-tool .mic-access-tool-box .link-access-page button:hover,#mic-init-access-tool .mic-access-tool-box .mic-disable-buttons button:focus,#mic-init-access-tool .mic-access-tool-box .mic-disable-buttons button:hover{color:#8b0000;border-color:#8b0000;background-color:#ffc!important;cursor:pointer}#mic-init-access-tool .mic-access-tool-box .link-access-page button:focus span,#mic-init-access-tool .mic-access-tool-box .link-access-page button:hover span,#mic-init-access-tool .mic-access-tool-box .mic-disable-buttons button:focus span,#mic-init-access-tool .mic-access-tool-box .mic-disable-buttons button:hover span{color:#8b0000}#mic-init-access-tool .mic-access-tool-box .link-access-page button.vi-enabled,#mic-init-access-tool .mic-access-tool-box .mic-disable-buttons button.vi-enabled{border:dashed 1px #8b0000;background-color:#fffff3}#mic-init-access-tool .mic-access-tool-box .link-access-page button.vi-enabled span,#mic-init-access-tool .mic-access-tool-box .mic-disable-buttons button.vi-enabled span{color:#8b0000!important;font-weight:700}#mic-init-access-tool .mic-access-tool-box .link-access-page button.vi-enabled::before,#mic-init-access-tool .mic-access-tool-box .mic-disable-buttons button.vi-enabled::before{content:"\\2713";position:absolute;top:2px;right:2px;color:#00e800;font-weight:700!important;line-height:1!important;font-size:14px!important}#mic-init-access-tool .mic-access-tool-box .mic-buttons-block{padding-bottom:10px}#mic-init-access-tool .mic-access-tool-box .mic-buttons-block.mic-contrast-block button span,#mic-init-access-tool .mic-access-tool-box .mic-buttons-block.mic-fonts-block button span{display:block;position:absolute;color:#333;width:100%;right:0}#mic-init-access-tool .mic-access-tool-box .mic-buttons-block.mic-contrast-block button span:nth-child(1),#mic-init-access-tool .mic-access-tool-box .mic-buttons-block.mic-fonts-block button span:nth-child(1){top:14px}#mic-init-access-tool .mic-access-tool-box .mic-buttons-block.mic-contrast-block button span:nth-child(2),#mic-init-access-tool .mic-access-tool-box .mic-buttons-block.mic-fonts-block button span:nth-child(2){bottom:8px}#mic-init-access-tool .mic-access-tool-box .mic-buttons-block.mic-contrast-block button span:nth-child(3),#mic-init-access-tool .mic-access-tool-box .mic-buttons-block.mic-fonts-block button span:nth-child(3){top:2px!important;right:2px!important;color:#00e800!important;display:inline-block!important;width:auto!important;font-size:12px!important;direction:ltr!important;line-height:1!important;font-family:monospace!important}#mic-init-access-tool .mic-access-tool-box .mic-buttons-block.mic-contrast-block button.vi-font-enabled,#mic-init-access-tool .mic-access-tool-box .mic-buttons-block.mic-fonts-block button.vi-font-enabled{border:dashed 1px #8b0000;background-color:#fffff3}#mic-init-access-tool .mic-access-tool-box .mic-buttons-block.mic-contrast-block button.vi-font-enabled span,#mic-init-access-tool .mic-access-tool-box .mic-buttons-block.mic-fonts-block button.vi-font-enabled span{color:#8b0000}#mic-init-access-tool .mic-access-tool-box .mic-buttons-block.mic-cursors-block button span:last-child{margin-top:5px}#mic-init-access-tool .mic-access-tool-box .mic-buttons-block button{cursor:pointer;display:inline-block;padding:0 5px;position:relative;text-align:center;width:30%;height:80px;border:solid 1px silver;vertical-align:middle;line-height:1;font-weight:700;font-size:16px!important;border-radius:3px}#mic-init-access-tool .mic-access-tool-box .mic-buttons-block button span{display:block;font-size:16px!important;color:#333;line-height:.9!important}#mic-init-access-tool .mic-access-tool-box .mic-buttons-block button:focus,#mic-init-access-tool .mic-access-tool-box .mic-buttons-block button:hover{color:#8b0000;border-color:#8b0000;background-color:#ffc!important}#mic-init-access-tool .mic-access-tool-box .mic-buttons-block button:focus span,#mic-init-access-tool .mic-access-tool-box .mic-buttons-block button:hover span{color:#8b0000}#mic-init-access-tool .mic-access-tool-box .mic-buttons-block button.vi-enabled{border:dashed 1px #8b0000;background-color:#fffff3}#mic-init-access-tool .mic-access-tool-box .mic-buttons-block button.vi-enabled span{color:#8b0000!important}#mic-init-access-tool .mic-access-tool-box .mic-buttons-block button.vi-enabled::before{content:"\\2713";direction:ltr!important;position:absolute;top:2px;right:2px;color:#00e800;font-weight:700;font-size:12px!important}#mic-init-access-tool .mic-access-tool-box .mic-toolbox-all-credits{position:relative!important;padding:0 5px!important;background-color:#033!important;text-align:center!important}#mic-init-access-tool .mic-access-tool-box .mic-toolbox-all-credits a,#mic-init-access-tool .mic-access-tool-box .mic-toolbox-all-credits span{display:inline-block!important;vertical-align:middle!important;color:#fff!important;width:auto!important;font-family:monospace!important;font-weight:700!important;font-size:15px!important}#mic-init-access-tool .mic-access-tool-box .mic-toolbox-all-credits a{text-decoration:underline!important}#mic-init-access-tool .mic-access-tool-box .mic-toolbox-all-credits a:focus,#mic-init-access-tool .mic-access-tool-box .mic-toolbox-all-credits a:hover{background-color:transparent!important}@media screen and (max-width:47em){#mic-init-access-tool .mic-access-tool-general-button>div span{display:none}#mic-init-access-tool .mic-disable-buttons{display:none}#mic-init-access-tool .mic-access-tool-box{width:100%}#mic-init-access-tool .mic-cursors-block{display:none}}body.mic-toolbox-zoom-up>:not(#mic-init-access-tool){zoom:1.4!important;-moz-transform:scale(1.4)!important;-moz-transform-origin:40% 0!important}body.mic-toolbox-contrast-monochrome>:not(#mic-init-access-tool){-webkit-filter:grayscale(1)!important;filter:grayscale(1)!important}body.mic-toolbox-contrast-mono1>:not(#mic-init-access-tool){-webkit-filter:sepia(1)!important;filter:sepia(1)!important}body.mic-toolbox-contrast-soft,body.mic-toolbox-contrast-soft>:not(#mic-init-access-tool),body.mic-toolbox-contrast-soft>:not(#mic-init-access-tool):not(img){color:#000!important;background:0 0!important}body.mic-toolbox-contrast-hard>:not(#mic-init-access-tool){background-color:#fff!important;color:#000!important;-webkit-filter:invert(100%)!important;filter:invert(100%)!important}body.mic-toolbox-disable-buttons-animations *{-webkit-transition-property:none!important;transition-property:none!important;-webkit-animation:none!important;animation:none!important;-webkit-animation-name:none!important;animation-name:none!important}body.mic-toolbox-disable-buttons-keyboard>:not(#mic-init-access-tool) a:focus,body.mic-toolbox-disable-buttons-keyboard>:not(#mic-init-access-tool) button:focus,body.mic-toolbox-disable-buttons-keyboard>:not(#mic-init-access-tool) h1:focus,body.mic-toolbox-disable-buttons-keyboard>:not(#mic-init-access-tool) h2:focus,body.mic-toolbox-disable-buttons-keyboard>:not(#mic-init-access-tool) h3:focus,body.mic-toolbox-disable-buttons-keyboard>:not(#mic-init-access-tool) h4:focus,body.mic-toolbox-disable-buttons-keyboard>:not(#mic-init-access-tool) h5:focus,body.mic-toolbox-disable-buttons-keyboard>:not(#mic-init-access-tool) h6:focus,body.mic-toolbox-disable-buttons-keyboard>:not(#mic-init-access-tool) input:focus,body.mic-toolbox-disable-buttons-keyboard>:not(#mic-init-access-tool) li:focus,body.mic-toolbox-disable-buttons-keyboard>:not(#mic-init-access-tool) p:focus,body.mic-toolbox-disable-buttons-keyboard>:not(#mic-init-access-tool) select:focus,body.mic-toolbox-disable-buttons-keyboard>:not(#mic-init-access-tool) textarea:focus{outline:0!important;background:#ff0!important;color:#000!important;-webkit-box-shadow:none!important;box-shadow:none!important;text-shadow:none!important}body.mic-toolbox-fonts-simple:not(i):not(.fa){font-family:Arial,Helvetica,sans-serif!important;word-spacing:.16em!important;letter-spacing:.12em!important;line-height:1.6!important}body.mic-toolbox-content-links a{text-decoration:underline!important}body.mic-toolbox-content-highlight>:not(#mic-init-access-tool) a{outline:4px solid #ff1493!important;background:rgba(0,217,255,.6)!important;background-image:none!important;color:#000!important;-webkit-box-shadow:none!important;-webkit-text-fill-color:#000!important;box-shadow:none!important;text-shadow:none!important}body.mic-toolbox-content-headers h1,body.mic-toolbox-content-headers h2,body.mic-toolbox-content-headers h3,body.mic-toolbox-content-headers h4,body.mic-toolbox-content-headers h5,body.mic-toolbox-content-headers h6{text-decoration:underline!important} body.mic-toolbox-cursor-big-white{cursor:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAzCAYAAAAZ+mH/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDA1OTE2NURCQzkyMTFFN0IwODJCQjE5QzZFMDg2QjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDA1OTE2NUVCQzkyMTFFN0IwODJCQjE5QzZFMDg2QjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEMDU5MTY1QkJDOTIxMUU3QjA4MkJCMTlDNkUwODZCNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEMDU5MTY1Q0JDOTIxMUU3QjA4MkJCMTlDNkUwODZCNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Phwph8YAAAWrSURBVHjavFldSGxVFF7zq+N4/RtTuY1SU2SWoqUW/iAZhL1UFD4kVBD02Jv45os/+Psi+CCU9hRYkGVF1kOUmEYZpmGJEpqJ4Ev5e/XqzDi7tU5rz92zx7nqzBwXfBxn73P2/va311pnnS0AwDuI3xG34H9zIGwMC8NUsyIOEU8iphAexDnCzn2mE5AkrPx3PRPJZiJSEavZiqgkyJ5BfInIQQSZiOmKXDRBDSuSc1OKxFplJWISkasQMU2RiIF9Ph+kpqbKn88ivmAiIYTTLEVUfzAIeL1ecLlcsulpxKdmKxIxYFpaGrS0tEBOTg44nU7VWT83W5G3EIJQWVkpyAYGBkRBQYFAZYTsQ/yM8JJgxDfZqoRJVFRUiGAwaBDp6uoS+fn5AhVRiSwoRNxK5CSsSAQJv98vpPX19Ym8vLwbUSQmiZtU5L4kVEVSUlJMU+RSElKR3Nxc4XA4TFHkSiTIent7hcfjMUWRK5OQihCRZCtyLRJmKXJtElIRzKxJUyQuElKR7OxsPXzjUiRuEmSdnZ0GkUQVSYhEshRJmIRUJCsrK25FkkKCrKenR2RmZsalSNJIkHV0dIiMjAxht9uvpUhSScSrSNJJXKLIgxoRm2kkyPr7+w0imiI/MZEUScSeSCESCoXg9PQULJboqKO21tZW2Nvbg7GxMeOKVZtaxb+E+DdhEoeHh1BbWwv7+/sxidhsNkB14fz8XO2SVfxrRORKJI6OjoyJsPgFzAPhdrfbbUyws7MTzxqkIq9YL7uzu7sbsAqHkpISWFpaitqOsrIyQOeLV0z60hu779PoWDA8PAy7u7uGnFjmwcTERLgfX+XQ1tYGk5OThvToi9T8B+JDzgdB/lYJ8ceT/DvIvwOI7SgSVqs1rAARoG1gh4KFhQWYnZ2F+vr6yOWgUouLi5IE2TziH46GAE94rhChq5/7QhHbQU5EGBwchKGhITg4ODD2XNrW1haMj49HECDHbGxsNJ5jowOXF3i1enq2cJuNv+RSOVfcyxNVVVWivb39ooI2jObmZrG9vR2RD3C7RGFhoXrfPqIC8RjiIcRtRB5/Snr42IGQhUgnRuWIV4kNJhaYn583YlpVAO2uZLyysgINDQ1QXFwcDkvyDdqy6elpw1k5EZ0hvmf5z1j6gOIPQcVn7ilB3xZadiN8gHhZ/qb+8vLyqOw4MzNj9KNPyee+46On23x1MzknL8jBZ2P2CCWOj4/VpLKMGER8hjhA0HlBOfXTyskJa2pqIhLTxsYGrK6uhtMI4hfEX+wLAc05Q3JhsfIEhdm7iK/5YUqvi6qD0oSqFRUVQVNTE2AVLpvIB15n59MdVFcb3tQafuVzK/LyUkQx4mHEUwhapsBVi9LSUrG8vBy1LT6fz+hXxitmQrd4O2x6QaMr8RvibY5xku2YQV76J+ITkpG2Ym1tDaampiAQCIQfPjk5gerqasPB2fycngXvvy1WjfmGUnQ8TsoiHuVrgRJSHn4F79L9FMK0at0wmYn09HRVjTlW4gEKR3bMiO0hZnWIR/jVesRee8bwK2FFA95hvEihSMdKlC3JH1TfoCw7Nzcnmyg61tmnbJpTGkYSzSC+ReyxR9/lmwJKLAO3+fk+2irb+vo6jI6OQl1dHZydncHIyAhsbm4a+UJNxIhMmWeUA1yhErGyRJmcwTJYNpd22O5kkuTtP8icQNkV07yRbb1e74VZlsk/weO7lS0Jm1Op+dJ48hStELWyai5Gs5zA5XIZH8daRKggZd/jbfFofhEhl13LYvq/GiyKYum8oh9jTCoU//kK8TyHuJffHVFK2Hmv9bAR2hUUvwjxvyfe53yiP0eVz0cc5tM8oUV5Xwh9XHuMyWKZ4MFoFX8zGZkUyME/5lrijqx7tEiTL6+I+a57yCVrAQcP+BznFLJvlC1Vixa/gqDy/ggr8p8AAwB38ep+f+/fmwAAAABJRU5ErkJggg==),url(https://raw.githubusercontent.com/mickidum/acc_toolbar/master/app/cursors/w2.cur),auto!important}body.mic-toolbox-cursor-big-white a,body.mic-toolbox-cursor-big-white button{cursor:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAtCAYAAAAz8ULgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkE0QzFBMjdCQzkyMTFFNzg4RDE5NkYzNkM0MDkwNzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkE0QzFBMjhCQzkyMTFFNzg4RDE5NkYzNkM0MDkwNzAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGQTRDMUEyNUJDOTIxMUU3ODhEMTk2RjM2QzQwOTA3MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGQTRDMUEyNkJDOTIxMUU3ODhEMTk2RjM2QzQwOTA3MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnfOpO8AAAhdSURBVHjaxFlpTBVX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),url(https://raw.githubusercontent.com/mickidum/acc_toolbar/master/app/cursors/wh2.cur),auto!important}body.mic-toolbox-cursor-big-black{cursor:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAzCAYAAAAZ+mH/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODM1RTg1NDJCQzhFMTFFNzhFNDdGMzY5NjY0M0JBMTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODM1RTg1NDNCQzhFMTFFNzhFNDdGMzY5NjY0M0JBMTQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MzVFODU0MEJDOEUxMUU3OEU0N0YzNjk2NjQzQkExNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4MzVFODU0MUJDOEUxMUU3OEU0N0YzNjk2NjQzQkExNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PisYaokAAAcASURBVHjavFhrTFRHFJ5978pLcFFKHzxkY22RRo3+qy4JgUCsMahJEVEWRIz946LUAq0toolVofLDR0tisLhiUFEETPxhTQyxPqqNSuIjLTZGLI1UgqbyWJbbby5zl7m7d3nIrpN8md1zH/Pdb845c2aIzWZbfe/evSMmk4mwpgU0gBpQMQS0qXt7e3WJiYmFra2te8LCwnSwCR4kAt9Wrlz5ucDa5cuX9xmNRkrEABg5VQKqiOxrrVbrtubm5j2hoaE6Zte+jSlRM7hbSkpK0alTp77R6/Uqdk3L3RcQQorznpqa+uW5c+e+DQkJ0b4NRWQk2traSH9/v/g7PT29uKGhoQyKSCpoPBTxq2PmSI65fv16ITs7WxgYGJBMwoULF76HImG4dRrnrH4lIvMHnU5HHA4HsdvtbhtV5OTJk8W4JgRKERkJjUYj9ocOHRKJDA0N0b+qjIyMsrNnz34VHBwskeB9ROXX6SgsLBRYshKxdetWgWtDLS0t5VBkGpsag0ceCQwJiqKiIsHpdLqZUCJQJNivPjIeCR+KfAdFTH5TZCIkJCIul8vNpKmpqSQIzS+KTJQERVlZGa+IE85aqtVqp67IZEhQlJaWyhRBZp26IpMl4UOREgVFJk7kTUgoKdLY2Fg8DY1TZOIlwJuSoCgvL+cV6cfqW4SEZ+AUmVhxNBUSFBUVFTyR4dOnTxdNWpGpklCr1cKuXbt4IgOTVmSqJHwpAiJ200j1PL4i/iJBFdm9ezdPpO/EiRNfwK4fVxF/kZCwf/9+nshgfX395nEV8TcJ+IInkddQZPOYivibhA9FnFQRBI3Jg8iIIoEiQRWprKyUKXLs2LEClUql81IkUCQkVFVVyRIaiORjg0V9I0giop1KQUTLQVTjBOlb8ToGJTt27CAolMmGDRuoybBu3brq4eFhkpeXV4frWmnz+8YtPDycnD9/Xuzpi5UaJUjJUkKYCmoKys3NPUhtGzduPI4txsSViIqKIl1dXTJbd3c3efjwIcFLJ8vfkJOTc4T6Q0FBwc8TIrF9+3ayZMkSsmLFCoJ6U3bt6NGjJCsrixgMBvq1LnxZF6Zczb6aMN+QzRKDFkS29fT0/DkuiS1bthBkQlHOhQsXkmvXrsmuX79+nVy9epUkJyeL/+F4PyEcf4fcGhChczTMeoH2FMgZLmCQ+mdnZ2fPmCSKi4vJ3r173f/XrFnjRWJwcJDU1dWJJDCAJjo6OunKlSv1zN9cDMMMAuupzcngkoXopk2bZEULnI0PL+H58+dCZGSkVxiGhoYKT548GSnFh4b+Wbp0aQbsCYAFiAXeB94DohmiADP1bSBE7flVtO3cuVOcAmlesTftoCuj2Wwma9eu9VLs5cuXpLa2VgrbmQjDT+lj9JWsp7vsPobXrB9kSgzJlICnCiUlJbKvP3PmzPG0tLRMEOml/+EDAvY+XmokJSUJcDLxGfT3IyIiPoT9XSASmA5IGyYTg5ElK52MxKNHj2RTgE2OA5uc+bjxoxs3bjRSG60rsUlWzI4g7H4WaubBNoMhxD3g6LZgFDwJvqGUr0Wm+wQ3JQKz8/Pzc2nVRK/B+xVJLFu2zP387du3W+A/kYwEVUHvsYyrFBcwjkANSviPcQOVdA4QHxcXZ+no6PhVrFb6+oSEhAQvEnhGuHPnjvSaF9jNp8AeypQw+toYqT0NIHAwOzu7El4+4jQjTjX4+PHj7osXLzbSe2h822w2LwelRwk0eUlZHWk5jTtK8H2mwSnhAoEqfE0cC6945lgzWThFLFq0yIII6qQ3P3jwQDFcY2JihKdPnwpMsb8sFsscbkoMikRWrVplow80NzdXYDdHY/gDIIbF8wxOTtoHIVn9IOmNdK3oGzU1Ne6pPXDgwGbYwliEmLgDltGGxWf1zZs392FJpoPM4pKJ5NUm9gW010E5K94thuulS5cUScydO1fAGiKSwAL3CxY/+s4IpobOSw3IF44kNJ2xNbPBpbg2cmEl1oi4N6S9vb2FZUdh8eLFMgLz5s0Tqqur+cO315mZmZ9xahqUHFTHBgthkJKK3iOmtUwNPerHLGmEw4cPi2l7+fLldD8qO/mT2t27d39CvglnJIxKU6JjAxo56D121tLprqhGfHz8O5C7XYzDFy8ETKdSqqGJ7z8QaMCUZyKdz2Jqm7h3j1ZpzKj1+HLPY2Q1rwYSVongo7169eoPh8PxY2pqajp8bTbzMYmEUYmEioth9RhHgypGTky/Vqt1Psb7mxvb9ezZs9+wL/0aoZzMQtzChbqZS99ePqFSwFjnnmLJjpSuu3XrFi1W/21ra2uy2+05sCXRFM8Gt3Chbmb+YFKKjskecqk4IuoFCxYkxMbGmltbW+/DITVMasIyrVOh54scd+n3vwADAK1sS+5aX9ZxAAAAAElFTkSuQmCC),url(https://raw.githubusercontent.com/mickidum/acc_toolbar/master/app/cursors/b2.cur),auto!important}body.mic-toolbox-cursor-big-black a,body.mic-toolbox-cursor-big-black button{cursor:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA1CAYAAAADOrgJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUIxMTcwRTBCQTVCMTFFNzlFMTNDNDI4RjQ5NjYzNDAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUIxMTcwRTFCQTVCMTFFNzlFMTNDNDI4RjQ5NjYzNDAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QjExNzBERUJBNUIxMUU3OUUxM0M0MjhGNDk2NjM0MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5QjExNzBERkJBNUIxMUU3OUUxM0M0MjhGNDk2NjM0MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsArU6kAAAuPSURBVHjazFoJcE1LGu57c28iCRERSxBRQSwxZZnEUNb3wihqGNSzxlBTQlJG8GIUxlMqyv6IMlTZhmIKsZXBBAkeMWQsZa0RYjBi3wVZZLu35/tbn7y+556b3AR5uqrr3PTpc05//W/f/3dMrHLNpLvqG9ddq62ZqjDX1SKt6HZ5v9oBWSoBwIxuGzJkyHe/R1MnLFiwYNmdO3f+g5810Et/KTDuNALBhg0bNsqGxnXt3r17D5s2bdoWUzzQfaR0POQmmL4mELQo9uDBg0e08Lt37/IlS5bw1atX8zdv3ggwkEh2cHBwGykVbwnG/DUBEQuZOXPmDyVo79+/51FRUZrq8FGjRvFXr14JMLGxsXMxVgu9tgRk0aT5NYAQ0li6dOlKWuzly5e5n58fV+yAJyUlCSBPnjzJxd9N0etJQF6Kin153XenlZaWkkdiUCuWn5/vcG/r1q0MdsICAwO9ExMT/4KhYikNj+pSLXNlVcxsNouutuvXr7MzZ84wq9XqERAQ0EC+V7WRL270ZncB+Pj4+NK1YcOGzNfX12ECHBk7evQog+Ez2My3Xbp0+a10w9avTbWsqampR2HUb8PCwljdunWdJpBUYCN0z69WrVqBEoDazV9SMu4AIYO2pqWl/ePRo0cv69Spwxo3buw0Ce5XAIHNM7vdrkkhX3ayGZt8l8UApAZU7ZUCbXFzHhm6t6enp9XDw4Mh+DlNIAfw4sULAQSSy61fv36LESNG9AGoYpPJZKO+f//+lIcPH/5XqlxJOVSHy28yd9mBxQ1paFf7GzICxpr17t2bbdu2zXEiANy/f5+9ffuWLV++fCZUzKdjx47B6pw/oXXv3j3q3bt3eXv37v177dq1a2nPAihLTk7es379+r/KGGRTAJk+B+UhMXtSb9eu3bcUL06fPs1h8A6xhPqgQYM4wHAKmoid/Pz58xwL5ikpKWKMGrzblUOHDqVzFy0mJuZ7+V0f+V1Nzcw6W6tSUCRxW8LDw3vRx7Kzs3mbNm2cgERERBDv4i9fvuTYXQ4PJ8YtFosACbUqW/Dr169FIJ0wYQIxAp6e/hEbVJEPHjz4jzVq1AiAPYb4+/s3Rg9S1mGtLCCTshMiJrRv315IpKCgQCxADwRci8N7CaB9+vRxur9p0yaOwMo/fPjAo6OjHe5h0fzEiRMCzI4dO1IvXbqUWYxWWFhIl+Jp06bNluvylpKyuAKjLtyoeYCaNMRH/kkEmHZTv1DsolAjeDAhHf19WjzxMurNmjVzup+QkMCLioq4RrABQoDWWlxc3AwEY7IfXz0YiwEYe9++fQcgAHrjWQEOzXzx4sXrjx8/zrxx48b/KLJHRkYycsU5OTllD+PD7MqVKwy2xLy8vJx24tq1awyGLvpHv+HYIAX29OlT1qBBAwY7YitXrmS5ubls1qxZFGjZ2rVrl0Hit2BnaVJLio2kISQxceLESUZGCAC3Fy1a9GOrVq26Z2VlPaLdQgR32lWoAEe84dgMp3uhoaHChnbv3s1BZwxVExvBnz9/zjt16lQ2jo0ps69evXqNxlhNHcMWEhE6RtseHx+fsGrVqhX0N3ZfBDkYKoNtMBh3C/Q/45Y/DDUXgAwDY2ZmpiCWtJP6RpKg+xkZGQxezek+uW6S6tmzZ9nNmzfLxinQkqSaNGlCrtoqWTWTsagscIof2KGaZFiEGiLmWHyZx6HdPX78eJnukrGT7s6YMcNpVxE0eevWrYW96O9RB0N2SgPU3q1bt7Jvax1ei9y2+DbiUAzGyIvVl5LRXPRHSgAgfjBCke7169fP6QNgtRx0XRggdo7n5eVx6LHLBX3OTkBOnjwpXDOAxMmch8D4aUDMehvRIrS+kXFOnjyZIcAJdSPGS6KuWbNmtWR4cNuiY30eRnxMBWICYvEHXKPhy0jvp0+fLii7lpNATaoFCK1Nrs8wv1Fjhgl6XYM4DzwP5R+GL4RHofIPEUMGus4aNWr0xUEQUaV1ERDSmPJovAliyx0/fvxkxIX3MDg2adIkly9G3k45PFVVhLhdNUrAYPw/7xQWQ7kMyKL4rTWaU69ePaGyRs3b25uyT5cgVDBWSdLYxo0b95LBg5Jz0HCXBgjVEg7A1T1IVMQKSMzBYQCAGEPAFGPYbTGP5rt6X+fOnYUnJU/Zo0ePeNJ+9MYylnipxq6VOv2gNj/C1z+kHZo7d66IIa501ig6a3k9qSY5BFVitPMkCRrXdpd2msZpnlFsoUZShOdiiF8F1BQ6z1VpcAUMeazrAwYM+A6R/H7btm1ZYmKioCKVbUZq4GpMG1fVTW1I0oTqbd68+Rgkc05GdIf8RJWITRYMvKD7d8Bex2IHiqKioqg493mKZHKhrhbsapwyUpIc1NCkJFt2RZMcJMIlECJiHqAEmfv27TtKcWL48OEMHKfSfl+9VrWRe+/QoYNQRxi9p1xjqQpCnzVqGZiXjJh1sQNBBw4cOE3Gn5qayuFu3YrEZMBEQ/QOgRItGqMrURkaI6MnQ6e/4c2c3kV5ze3bt6kXtWzZ8g8YayeNva7MTQRfNOvycy5VrORjucqWu2XLll0IhIU9e/ZkY8eOrdZ6LTmBcePGCXd9+PDhfwNMpiZwJafnrrJCzR1T8kL1qdrIRe6SVK5evcpDQkKqLBEYrRhDvuGWREaPHi0yTrDfkrCwsPEY+xV6GHoDpbbsMuXVCteekl36g832Bq2+l5+fz9etWyc+XBUgcKNiDB6oQiBU8afchAgqgm8anvs1xttLtQqUG20tL2/XeIxF6qA/PQDKvoKkQi9etmyZoPcVAaHgR4tXgWiSUYHAiEVQJJar2dKRI0dESgwteBseHk7UvSN6a/RGSlJVYTnWpJSBKOIHgIY1TU5OPkZg6ANz5swRu+sKDAGlHVYlQouGF+RBQUEOGSL9JpAEnp5buHChyDIvXLjwDAncRAnCSBpuVVJMihcjfayDXQzes2fPTwTm2bNnfPbs2WLXXdEUowSKwGnSUIFoHrFr167iRIwkP3Xq1G0SQIS0jaDKSEMvFYt8kFQsEAsM2blzp6jbUG49f/58l9lgVTrsQbwXETwHpLM/xn6DTueTVLUMUM4oK1WoM+lIJb2oPnawORKsUxqYxYsXV+gA9CRw6NChTs+Q6h08eFAQ1tjY2L9hrLNUq1AltfWqarXRrHgxXxmIGkCXm+/atSud0k+ymSlTprgFYuDAgTwjI4NnZWXxFStWOKgZFelOnTol3hccHDxWgqAD1iak2koANJeXWJVXyLYrgbKIfoN65I8ZM2YCbOZfRCMoh3GVT2iNDoni4+PFleb279+fRUdHOzBq4luUSMEpWCRd0nqJXIPdKBC6C4TpwBRSdAXtfpqWlnaCCB2xU4rArhpRcUqTQ0NDWXZ29isQ01fEaiFJ9s033whgBIA6/c5DU4isTUcSeVXPR1QwpYr9FGHxIgUED2JJSUkiR9EKBVoNgPITqgNEREQwuF6WkJCwLT09/aeUlJQ1kZGRIWvWrBG1LAJAVUZqMTExA+fNm3dZ2cByKUlVKvMmxZOZwYXi9VVJqn9RNkclI/A0cSVWcOvWrbwNGzakwxZ+h2e70vXcuXP31GepyE1t5MiRPxiVfSr6P5OqgNEcgD0uLu77Fi1aNC8sLLQAhBXdTMdvVDuWhzjCQ23fvv0YEraLiibkQkLNIKFoPEtzqeBJdWMbPOG6nJycB9I+CuS1VHeS9UlA9G7ZS35EYwHeyjmGWTltsikAStjP/3xD4x+U+dp97XiuQDoY1dirfIboym404/dUoq16Tzs204y0SEmMNJ036epr2rqKFSnYKrINyyeA0Bs/UzNMXRGN69y4TZfhqdVDNVvVNsqum/9ZJaLuvLbIEl050ygeGS3K6Djarnt/xf/V8IleTF/GLI8+qMfO3IUTYQZZK6/I9Zo+k0tmOjUqD4j+qLmifwxw61j6/wIMALlVhcM6zgK2AAAAAElFTkSuQmCC),url(https://raw.githubusercontent.com/mickidum/acc_toolbar/master/app/cursors/bh2.cur),auto!important}body.mic-toolbox-content-images span.mic-toolbox-images-titles{display:block!important;font-size:20px!important;max-width:180px!important;line-height:1!important;margin:0 auto!important;font-weight:400!important;text-align:center!important;background:#ffffe0!important;color:#000!important;-webkit-box-shadow:none!important;box-shadow:none!important;padding:10px!important;border:solid 1px #8b0000!important;border-radius:0!important}',
        document.head.appendChild(t);
    var i = document.createElement("div");
    i.id = "mic-init-access-tool",
        i.innerHTML = A,
        document.body.insertBefore(i, document.body.firstChild)
}

,

MicAccessTool.prototype.pageStructure = function(o) {
        var modal = document.getElementById("myModal");
        modal.style.display = "flex";
        var span = document.getElementsByClassName("close")[0];
        // var but = document.getElementsByClassName("tablinks")




        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }


            // but.onclick = function() {
            //     var i, tabcontent, tablinks;
            //     tabcontent = document.getElementsByClassName("tabcontent");
            //     for (i = 0; i < tabcontent.length; i++) {
            //         tabcontent[i].style.display = "none";
            //     }

            //     for (i = 0; i < but.length; i++) {
            //         but[i].className = but[i].className.replace(" active", "");
            //     }
            //     document.getElementById().style.display = "block";
            //     this.currentTarget.className += " active";
            // }


        }


        MicAccessTool.prototype.updateState()
    },

    MicAccessTool.prototype.contrastChange = function(o) {
        if (o.preventDefault(), document.body.classList.contains(this.id)) this.classList.remove("vi-enabled"),
            document.body.classList.remove(this.id),
            delete window.MICTOOLBOXAPPSTATE.bodyClassList[this.id];
        else {
            for (var A = document.querySelectorAll(".mic-contrast-block button"), t = 0; t < A.length; t++) A[t].classList.remove("vi-enabled"),
                document.body.classList.remove(A[t].id),
                delete window.MICTOOLBOXAPPSTATE.bodyClassList[A[t].id];
            this.classList.add("vi-enabled"),
                document.body.classList.add(this.id),
                window.MICTOOLBOXAPPSTATE.bodyClassList[this.id] = this.id
        }
        MicAccessTool.prototype.updateState();
    }

,
MicAccessTool.prototype.cursorChange = function(o) {
    if (o.preventDefault(), document.body.classList.contains(this.id)) this.classList.remove("vi-enabled"),
        document.body.classList.remove(this.id),
        delete window.MICTOOLBOXAPPSTATE.bodyClassList[this.id];
    else {
        for (var A = document.querySelectorAll("#mic-toolbox-cursor-big-black,#mic-toolbox-cursor-big-white"), t = 0; t < A.length; t++) A[t].classList.remove("vi-enabled"),
            document.body.classList.remove(A[t].id),
            delete window.MICTOOLBOXAPPSTATE.bodyClassList[A[t].id];
        this.classList.add("vi-enabled"),
            document.body.classList.add(this.id),
            window.MICTOOLBOXAPPSTATE.bodyClassList[this.id] = this.id
    }
    MicAccessTool.prototype.updateState()
}

,
MicAccessTool.prototype.onceButtonChange = function(o) {
    o.preventDefault(),
        "mic-toolbox-disable-buttons-keyboard" === this.id && (window.MICTOOLBOXAPPSTATE.keyboardRoot = !window.MICTOOLBOXAPPSTATE.keyboardRoot, MicAccessTool.prototype.keyboardRootEnable()),
        "mic-toolbox-content-images" === this.id && MicAccessTool.prototype.imagesChange(),
        document.body.classList.contains(this.id) ? (this.classList.remove("vi-enabled"), document.body.classList.remove(this.id), delete window.MICTOOLBOXAPPSTATE.bodyClassList[this.id]) : (this.classList.add("vi-enabled"), document.body.classList.add(this.id), window.MICTOOLBOXAPPSTATE.bodyClassList[this.id] = this.id), MicAccessTool.prototype.updateState()
}

,
MicAccessTool.prototype.keyboardRootEnable = function() {
    if (window.MICTOOLBOXAPPSTATE.keyboardRoot)
        for (var o = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,a,button,input,select,textarea"), A = 0; A < o.length; A++) {
            o[A].tabIndex = A + 1
        }
    else window.location.reload()
}

,
MicAccessTool.prototype.fontsChange = function(o) {
    o.preventDefault();
    var A = window.MICTOOLBOXAPPSTATE.fontSize;
    if ("mic-toolbox-fonts-up" === this.id) {
        if (1.6 <= A) return;
        for (var t = document.querySelectorAll("body,h1,h2,h3,h4,h5,h6,p,a,button,input,textarea,li,td,th,strong,span,blockquote,div"), i = 0; i < t.length; i++) {
            var e = t[i],
                c = window.getComputedStyle(e).getPropertyValue("font-size").split("px"),
                n = Number(c[0]);
            e.style.fontSize = (1.1 * n).toFixed() + "px"
        }
        A = (1.1 * A).toFixed(2)
    }
    if ("mic-toolbox-fonts-down" === this.id) {
        if (A <= 1) return window.MICTOOLBOXAPPSTATE.fontSize = 1,
            void MicAccessTool.prototype.updateState();
        for (t = document.querySelectorAll("body,h1,h2,h3,h4,h5,h6,p,a,button,input,textarea,li,td,th,strong,span,blockquote,div"), i = 0; i < t.length; i++) {
            e = t[i],
                c = window.getComputedStyle(e).getPropertyValue("font-size").split("px"),
                n = Number(c[0]);
            e.style.fontSize = (n / 1.1).toFixed() + "px"
        }
        A = (A / 1.1).toFixed(2)
    }
    window.MICTOOLBOXAPPSTATE.fontSize = A,
        MicAccessTool.prototype.getFontsChanges(A),
        MicAccessTool.prototype.updateState()
}

,
MicAccessTool.prototype.initFontsChange = function() {
    for (var o = document.querySelectorAll("body,h1,h2,h3,h4,h5,h6,p,a,button,input,textarea,li,td,th,strong,span,blockquote,div"), A = window.MICTOOLBOXAPPSTATE.fontSize, t = 0; t < o.length; t++) {
        var i = o[t],
            e = window.getComputedStyle(i).getPropertyValue("font-size");
        i.style.fontSize = e;
        var c = i.style.fontSize.split("px")
    }
    for (t = 0; t < o.length; t++) {
        i = o[t],
            e = window.getComputedStyle(i).getPropertyValue("font-size").split("px"),
            c = Number(e[0]);
        i.style.fontSize = (c * A).toFixed() + "px"
    }
    A && this.getFontsChanges(A)
}

,
MicAccessTool.prototype.initFontsChangeFirst = function() {
    for (var o = document.querySelectorAll("body,h1,h2,h3,h4,h5,h6,p,a,button,input,textarea,li,td,th,strong,span,blockquote,div"), A = 0; A < o.length; A++) {
        var t = o[A],
            i = window.getComputedStyle(t).getPropertyValue("font-size");
        t.style.fontSize = i;
        t.style.fontSize.split("px")
    }
}

,
MicAccessTool.prototype.getFontsChanges = function(o) {
    if (1 < o) {
        document.getElementById("mic-toolbox-fonts-up").classList.add("vi-font-enabled");
        var A = "+" + (100 * Number(o) - 100).toFixed() + "%";
        document.getElementById("mic-toolbox-fonts-up-enabled").textContent = A
    } else document.getElementById("mic-toolbox-fonts-up").classList.remove("vi-font-enabled"),
        document.getElementById("mic-toolbox-fonts-up-enabled").textContent = ""
}

,
MicAccessTool.prototype.imagesChange = function() {
    if (document.body.classList.contains("mic-toolbox-content-images")) {
        for (var o = document.querySelectorAll(".mic-toolbox-images-titles"), A = 0; A < o.length; A++) {
            o[A].parentElement.removeChild(o[A])
        }
        window.MICTOOLBOXAPPSTATE.imagesTitle = !1
    } else this.imagesAddTitles(),
        window.MICTOOLBOXAPPSTATE.imagesTitle = !0
}

,
MicAccessTool.prototype.imagesAddTitles = function() {
    for (var o = document.images, A = 0; A < o.length; A++) {
        var t,
            i = o[A];
        if (i.alt)(t = document.createElement("span")).className = "mic-toolbox-images-titles",
            t.textContent = i.alt,
            i.parentNode.insertBefore(t, i);
        else(t = document.createElement("span")).className = "mic-toolbox-images-titles",
            t.textContent = "image without text",
            i.parentNode.insertBefore(t, i)
    }
}

,
MicAccessTool.prototype.updateState = function() {
    var o = JSON.stringify(window.MICTOOLBOXAPPSTATE);
    "undefined" != typeof Storage ? localStorage.setItem("MICTOOLBOXAPPSTATE", o) : console.log("No Storage Found")
}

,
MicAccessTool.prototype.openBox = function(o) {
    this.toolBox.classList.add("opened-mic-access-tool"),
        (!window.MICTOOLBOXAPPSTATE.initFontSize || window.MICTOOLBOXAPPSTATE.fontSize <= 1) && (this.initFontsChangeFirst(), window.MICTOOLBOXAPPSTATE.initFontSize = !0),
        this.toolBoxCloseButton.focus()
}

,
MicAccessTool.prototype.closeBox = function(o) {
    this.toolBox.classList.remove("opened-mic-access-tool")
}

,
MicAccessTool.prototype.openCloseBoxKeyboard = function(o) {
    27 == o.keyCode && this.closeBox(),
        o.ctrlKey && 113 == o.keyCode && this.openBox()
}

,
MicAccessTool.prototype.resetApp = function(o) {
    localStorage.removeItem("MICTOOLBOXAPPSTATE"),
        window.location.reload()
}

,
MicAccessTool.prototype.initialApp = function() {
    if (window.MICTOOLBOXAPPSTATE = JSON.parse(localStorage.getItem("MICTOOLBOXAPPSTATE")) || {
            bodyClassList: {},
            fontSize: 1,
            imagesTitle: !1,
            keyboardRoot: !1,
            initFontSize: !1
        }, window.MICTOOLBOXAPPSTATE.bodyClassList)
        for (var o in window.MICTOOLBOXAPPSTATE.bodyClassList) {
            var A = window.MICTOOLBOXAPPSTATE.bodyClassList[o],
                t = document.getElementById(A);
            t && t.classList.add("vi-enabled"),
                document.body.classList.add(A)
        }
        (1 < window.MICTOOLBOXAPPSTATE.fontSize && this.initFontsChange(), window.MICTOOLBOXAPPSTATE.imagesTitle && this.imagesAddTitles(), window.MICTOOLBOXAPPSTATE.keyboardRoot && this.keyboardRootEnable(), !window.MSInputMethodContext || !document.documentMode) || (document.getElementById("mic-toolbox-contrast-block").style.display = "none");
    if (this.init.link) {
        var i = document.getElementById("mic-toolbox-link-nagishut") || {};
        i.classList.remove("atb-hide-if-empty"),
            i.href = this.init.link
    }
    if (this.init.contact) {
        var e = document.getElementById("mic-toolbox-link-contact") || {};
        e.classList.remove("atb-hide-if-empty"),
            e.href = this.init.contact
    }
    "right" === this.init.buttonPosition && (document.getElementById("mic-access-tool-general-button").classList.add("mic-access-tool-general-button-right"), document.getElementById("mic-access-tool-box").classList.add("mic-access-tool-box-right"))
}

,
window.onload = function() {
    window.micAccessTool = new MicAccessTool
}

function openTab(evt, tabName) {
    // console.clear();

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    var con = document.getElementById(tabName);
    var hl = document.getElementById("headlist");
    var lil = document.getElementById("linkList");

    if (tabName == "Headings") {
        hl.innerHTML = "";
        console.clear();
        // console.log(document.links);
        var h = ["h1", "h2", "h3", "h4", "h5", "h6"];
        var headings;
        var n = 0;
        for (var i = 0; i < h.length; i++) {
            if (document.body.getElementsByTagName(h[i])) {
                headings = document.body.querySelectorAll(h[i]);
                if (headings) {
                    // con.innerHTML = "h" + (i + 1);

                    for (var j = 0; j < headings.length; j++) {


                        if (headings[j].textContent !== "") {
                            // console.log("h" + (i + 1) + " : " + headings[j].innerText + "\r\n");
                            // prodHTML = prodHTML.concat("h" + (i + 1) + " : " + headings[j].innerText + "<br>");






                            var node = document.createElement("LI");

                            var linspan = document.createElement("SPAN");
                            var headanchor = document.createElement("A");
                            var hash = "#"
                                // node.setAttribute("role", 'link');

                            linspan.className = "headBlock";
                            linspan.innerHTML = "h" + (i + 1);
                            var linname = document.createElement("SPAN");
                            headanchor.className = "headName"
                            headanchor.innerText = " " + headings[j].innerText;
                            var fid = "fi"
                            if (headings[j].id == "") {
                                headings[j].setAttribute("id", fid + (n));
                                n = n + 1;
                                headanchor.setAttribute('href', hash + (headings[j].id));
                                console.log(headanchor)
                                    // headanchor.onclick = document.getElementById("myModal").style.display = "none";
                                headanchor.addEventListener('click', closeModal);

                            } else {
                                headanchor.setAttribute('href', (headings[j].id));
                                headanchor.addEventListener('click', closeModal);
                                // headanchor.onclick = document.getElementById("myModal").style.display = "none";
                            }


                            // function closeModal() {
                            //     var mm;
                            //     mm = document.getElementById("myModal");
                            //     if (event.target == mm) {
                            //         mm.style.display = "none";
                            //     }

                            // }


                            // linname.setAttribute('href', hash + (headings[j].id))

                            node.appendChild(linspan);
                            linname.appendChild(headanchor);


                            node.appendChild(linname);

                            // lin.appendChild(linname);


                            // var textnode = document.createTextNode("h" + (i + 1) + " : " + headings[j].innerText);



                            hl.appendChild(node);



                        }
                    }
                }
            }
        }
        // console.log(res)

    } else if (tabName == "Links") {
        lil.innerHTML = "";
        let listOfLinks = document.links;
        var finalListOfLinks = [];
        console.clear();
        // console.log(listOfLinks);
        // console.log(`length of links = ${listOfLinks.length}`);

        let count = 0;
        for (let x of listOfLinks) {
            // console.log(x)

            if (x.className === "atb-hide-ifempty" || x.className === "wtu" || x.innerHTML === "" || x.innerHTML === "OK" || x.innerHTML === "Ok" || x.href === "javascript:void(0)") {
                // console.log("class in tooollll")
                // console.log(x)
            } else {

                finalListOfLinks[count] = x;
                count++;
            }

        }





        console.log("------------------------------------------------------")
            // console.log(finalListOfLinks)
        console.clear();
        for (let x of finalListOfLinks) {
            var insideTags;
            var y;
            var z;

            // console.log(x)
            let listNode = document.createElement('li')
            let spanNode = document.createElement('span')
            let anchorTag = document.createElement('a')
            anchorTag.setAttribute('href', x);
            anchorTag.setAttribute('target', '_blank');

            if (x.innerText === "") {
                // var insideTags = [];
                insideTags = x.children;
                console.log("-----------------------------")

                for (y = 0; y < insideTags.length; y++) {

                    // console.log(insideTags[y].tagName)
                    if ((x.querySelector("img"))) {
                        z = x.querySelector("img");
                        // console.log("yes");
                        if (z.alt === "") {
                            // console.log("IMAGE");
                            anchorTag.innerHTML = "IMAGE"
                        } else {
                            // console.log(y.alt);
                            anchorTag.innerHTML = z.alt;
                        }

                    } else if (insideTags[y].innerHTML === "") {
                        // console.log(insideTags[y].tagName);
                        // console.log("::::::::::")
                        // console.log(insideTags[y].innerHTML);
                    } else {
                        // console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
                        // console.log(insideTags[y].innerText);
                        // console.log(insideTags[y].innerHTML)
                        anchorTag.innerHTML = insideTags[y].innerHTML
                    }

                }
            } else {
                anchorTag.innerText = x.innerText;
            }

            // anchorTag.innerHTML = x.innerHTML;
            spanNode.append(anchorTag)
            listNode.append(spanNode)
            lil.append(listNode)
        }




        // console.log("========")
        // lil.innerHTML = "";
        // var glinks = document.getElementsByTagName("a");
        // let length = glinks.length;
        // console.log(glinks.length)
        // var k = 0;
        // for (k; k < length; k++) {

        // var listNode = document.createElement('li');
        // var spanNode = document.createElement('span');
        // var anchorTag = document.createElement('a');
        // if(glinks[k].classList.contains("atb-hide-ifempty")||glinks[k].classList.contains("wtu")||glinks[k].innerText===""){
        //     con
        // }
        // console.log("all bs");

        // if (glinks[k].className === "atb-hide-ifempty" || glinks[k].className === "wtu") {
        //     // console.log("no use")
        // } else {
        //     if (glinks[k].innerText !== "") {
        //         var hrefValue = glinks[k].href;
        //         // var arr = [];
        //         // arr.push(hrefValue);

        //         // console.log(hr);


        //         var nodel = document.createElement("LI");

        //         var sp = document.createElement("SPAN");
        //         sp.className = "linkName";
        //         var anchorTag = document.createElement("a");
        //         // console.log(hrefValue);


        //         anchorTag.setAttribute("href", hrefValue);
        //         anchorTag.setAttribute("target", "_blank");


        //         anchorTag.innerText = glinks[k].innerText;
        //         sp.appendChild(anchorTag);
        //         nodel.appendChild(sp);
        //         lil.appendChild(nodel);

        // anchorTag.setAttribute('href', hrefValue);
        // listNode.append(anchorTag);
        // lil.append(listNode);
        //         }
        // }
        // }

        // }












        // lil.innerHTML = "";
        // var glinks = document.links;
        // var k;

        // for (k = 0; k < glinks.length; k++) {
        //     // console.log(glinks[i].className);
        //     // console.log(glinks.length);
        //     if (glinks[k].classList.contains("atb-hide-ifempty") || glinks[k].classList.contains("wtu") || glinks[k].innerText === "") {


        //     } else {
        //         console.log(glinks[k]);
        //         // console.log(glinks.length);

        //         var nodel = document.createElement("LI");
        //         var sp = document.createElement("SPAN");
        //         var kspan = document.createElement("IMG");
        //         // var kspan = sp.createElement("img");
        //         // kspan.classname = "linkBlock";
        //         // kspan.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAE2UlEQVRYha2Wa2yTZRTHf8/bt91AxjZW2u5i5Loqu7PNdRsIhqiJMSHBy1AILIpZFGMCMaImxAQvgS/6ZRCQiTMM3AyBxA+aqChy24V1cxsYMhzRubq2u7CBjG3t3scPo0vXdVvb8f/2Pue853fe9zzn5AjCVE5TcZJ3zJstFCUV5PzxUzEkNa3dILzN9jx7dzjxRChO6XUFZp2qlEnkZuCxWUJeE2g1Uq870pp12T2nBDJbMh+SnvlvAR8IWBhKsn66K6A82is/rbfV3w47gcxGWwFwGkgKExwoh5BiU0t+bUMwoxLsMMtuKwF+fQBwgGQp5PnMK4Xbghmn/IGMxsIXBbImmG2OkhKxtS2v9uS0CWTYC3KFFOeB+ZEQLAYzpeatOEedVLlr8EpvoMuwkGKdfzkmErBeLI6Jih67ToS/PdFg4Zj1EEmGRAAuDF5id8f7jEpPoGsX+qFHW7Na74LfHTBEe9+JFP5wVDKV1sMkqAlU95yia8TB2thi9i/bhyrUQPcU4Zm32/cgYLzPFVX8CSyIBF6RepB4NZ5dHXu4dLsOoz6BitSDLI1+hLMD53j35t7ActxBr6xozbrsVgB0qlL2oOAAvZ4+drTvpGvEwYa49Ww1lQS+GoNX2wH3S3B/woWlRIOZL1MP+cHrJ9l7PX3U3h6/axaDeWoAyWYAJaepOIlZx+tUvWrZhtlg4lTvGTocCnvnVZL7X+mEfW1sERuNz+EcdVHpOhEsRHpaQ75FlZonZ5p5NKPcnh4AdH1WyjOeYWVCHFyDpntfsyaukM+W76ff08+O9p04R13BQgidTs1WJcqyUKGJBjOvWbbj9vRywl2N2mflycQsVibE0dE/QEXPF6xJmQz/Z8QxbTypsULVIDaUkee7cL566m+lss6cidUYT0f/IFdcf1OaZmOTcWNIcACBjJ3SpDPBF+kXcdL9Leok+AA/Olp4I2MdkIVr1B0S3CdVgUEZInxXxx7au6A8/amJL//Z0crxsX14HC9gMiym0llFd/CaT5FU5IAq0G7KaS5hIPziYB17TZVYjfHc6BvA7v6Lsown8Pz7Eke7K0OC+kugdKg6xpq0IAlYfH2uj78PrwXge/c5AI66j1C6qhDIxqhPCBsOSM2jNSv2PHu3hD8CraXmLZgNJs70fjcBB7DHfMXHQ6WsSJE8v3gjzlEXXzmrIkmg7aqt3qUAKMjqQKuvjsULbRj1xkm2NXGFfL78wGx9PotE9TgbUBTDYQmT9rYqdzU/3fqFlKhkKlLLJ5JYG1sUcp/PoDuaVzsGoANwHukcspSlRAHrfR4SydmB31gWvYTcmBw2xK1jefRS3k55c65wkHzUVlD/A/gtJGnX1i/Q3Ru+DiT7+ypC4ZMlH/LsoqcBJvq8c6QrMjh0oh9a5VtIJg3BzEbbauACASuZTujYYirBbDBx3PVNhDUHZlrJfMpoLHxFIKuC2eYoKQQvt+TW1fgfThkAbXm1J4VgMzD0AOHDQsrtgXCY4SuzG4ryNUU7DaTMEd4phdzUlltvD2acdhH4/fHLV/R4rBLeAwYjAN8VcGBkWJc+HRxCrHNmS5GJUe11BCVAxgyuEmhDUKMT+qPNqy/0zBY77IuW1pBv0enUbCHlSimIARCSO1KIG5pHa75qqw+rRf4Hrrf6e/Gqy5AAAAAASUVORK5CYII="

        //         // kspan.alt = "link icon";

        //         // sp.appendChild(kspan);
        //         var kname = document.createElement("a");
        //         // kname.setAttribute("href", glinks[k].href);

        //         var spa = document.createElement("SPAN");
        //         spa.className = "linkName";
        //         // console.log(glinks[k].attributes.href);

        //         // kname.setAttribute("href", glinks[k].href);
        //         // kname.setAttribute("target", "_blank");

        //         kname.innerText = " " + glinks[k].innerText;
        //         // kname.setAttribute("href", "sample");
        //         sp.appendChild(kname);
        //         nodel.appendChild(sp);
        //         // // nodel.appendChild(spa);
        //         lil.appendChild(nodel);




        //     }
        //     // if (glinks[i].className !== "atb-hide-ifempty" || glinks[i].className !== "wtu") {





        // }
        // console.log(lil.length);



    }



    // con.innerHTML = prodHTML






    // for (var avs = 0; avs < con.innerHTML.length; avs++) {
    //     console.log(con.innerHTML[i])
    // }


    // console.log(con.innerHTML)



    con.style.display = "block";
    evt.currentTarget.className += " active";



    function closeModal() {
        document.getElementById("myModal").style.display = 'none';
    }
}