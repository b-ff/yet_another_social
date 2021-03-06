<p align="right">
<a href="../en/svg-processing.md">English description</a> | Описание на русском
</p>

# Работа с SVG

В TARS поддерживается два workflow для работы с векторной графикой: svg-спрайт и svg-symbols. Эти два подхода отличаются от остальных (инлайн в html, инлайн в css, base64, svg-stack) почти 100% поддержкой во всех современных браузерах (от IE9 включительно), кешируемостью, быстродействием и удобством работы.

Вы можете использовать только один тип работы с svg-графикой в проекте. Одновременно symbols и спрайты не поддерживаются. Вы можете указать все настройки проекта для работы с SVG в конфиге.

**Очень важно, чтобы при сохранении SVG-картинки в ней присутствовал атрибут viewBox! Сохраняйте SVG как объект, который может быть вставлен в html без изменений (в Adobe Illustrator опция Image location – Embed).**

## SVG symbols

**При выборе этого workflow, сборка для IE8 недоступна**

В данном подходе SVG изображения склеиваются в общий SVG-файл, при этом каждая отдельная картинка представляется в виде [svg-symbol](https://developer.mozilla.org/ru/docs/Web/SVG/Element/symbol). В этом случае вы можете переиспользовать каждую отдельную иконку несколько раз, задавать ей цвет (даже два) и размеры через css. Частично об этом подходе можно прочесть на [habrahabr.ru](https://habrahabr.ru/post/272505/) и в [западных источниках](https://css-tricks.com/svg-symbol-good-choice-icons/). 

Изображения, которые должны быть включены таким образом необходимо складывать в папку (указан путь по умолчанию): `static/img/svg/`. Вложенность директорий **НЕ** поддерживается. 

Подключение этих иконок производится в шаблонах. В css можно лишь добавить цвета, размеры, заливку, цвет и толщину границ. Для подключения используются хелперы, которые сгенерируют весь необходимый html и атрибуты для подключения конкретный иконки.

Подключение в handlebars:
```handlebars
{{Icon iconName='%iconName%' className='%customClass%'}}
```

Подключение в jade:
```jade
!= jadeHelpers.Icon.call(locals, {iconName: '%iconName%', className: '%customClass%'})
```

При подключении иконки вы можете задать два параметра: имя иконки (%iconName%), которая подключается (без расширения) и имя класса (%customClass%). Если класс не будет указан, то класс сгенерируется автоматом по шаблону icon__%iconName%. Иконки можно подключать как в шаблонах страниц, так и в модулях. Данные хелперы сгенерируют следующий код:
```html
<svg class="chrome" width="32px" height="32px">
    <use xlink:href="#chrome"></use>
</svg>
```

Файл с готовыми символами генерируется в TARS автоматически. Остается только подключить его. В TARS поддерживается несколько способов подключения svg-symbols:
* Инжект в тело html.
* Хранение в отдельном файле.
* Хранение в отдельном файле, при этом каждая иконка подключается из этого файла.

В случае инжекта в use указывает только ID ионки (ее имя). Вы можете управлять, куда именно инжектить svg-symbols с помощью шаблона %=symbols=%, который по умолчанию присутствует в шаблоне, если вы используете оригинальную версию TARS. **Нет необходимости удалять эти метки и подключение резличных полифилов, скриптов для старых браузеров, так как это автом будет удалено из готовой сборки, если не используется!** 
В случае хранения в отдельном файле с подключением из него к ID иконки добавляется полный путь до этого файла.

```html
<svg class="chrome" width="32px" height="32px">
    <use xlink:href="static/images/svg-symbols.svg#chrome"></use>
</svg>
```

В этом случае svg-symbols кешируется браузером. При этом вы можете задать путь, по которому файл с svg-symbols будет находится в проекте с помощью опции pathToExternalSymbolsFile в конфиге. По умолчанию файл создается в корне готовой сборки.
Данный способ нативно поддерживается во всех современных браузерах, кроме IE9 - Edge. Для них в TARS предусмотрен полифил. Вы можете его не включать в сборку, если не поддерживаете IE. Код подключения полифила по умолчанию присутствует в шаблоне, если вы используете оригинальную версию TARS. **Нет необходимости удалять эти метки и подключение резличных полифилов, скриптов для старых браузеров, так как это автом будет удалено из готовой сборки, если не используется!**

Третий способ подразумевает, что вы сами реализуете подключение svg-symbols в шаблон. Вам будет необходимо написать код, который загрузит файл svg-symbols и вставит его в код страницы. Наиболее интересные подходы описаны на [css-tricks](https://css-tricks.com/ajaxing-svg-sprite/) и [osvaldas.info](http://osvaldas.info/caching-svg-sprite-in-localstorage). Последний способ один из самых эффективных.

Как использовать тот или иной тип подключения svg-symbols вы можете узнать из [документации о конфиге проекта](options.md#svg).

## SVG-спрайты

В данном подходе SVG изображения склеиваются в один SVG-спрайт. SVG-изображения в release-версии минифицируются и к нему добавляется hash в название. Изображения, которые должны быть включены таким образом необходимо складывать в папку (указан путь по умолчанию): `static/img/svg/`. Вложенность директорий **НЕ** поддерживается. 

Подключение SVG-спрайта производится с помощью миксина (пример на SCSS):
```scss
@include bg-svg($svg-image-name);     // Подключение svg-изображения
```

Обратите внимание, в миксин передается **переменная** с именем исходной картинки (без расширения).

Миксин `bg-svg` в css подключит svg-спрайт в качестве фона, задаст все необходимые смещения и размеры. Если сборка выполнена с ключом `--ie` или `--ie8`, то будет создан спрайт с растрированными векторными изображениями. Вам не нужно думать о том, как это будет работать в IE8, TARS все сделает за вас.

В данном подходе вы не сможете задать цвет svg через css. Необходимо, чтобы картинка уже была полностью готова к использованию, прежде чем она попадет в спрайт.


