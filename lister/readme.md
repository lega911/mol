# $mol_lister

Спискок строк с ленивым рендерингом.
Минимальная высота строки задаётся свойством `rowHeightMin()`.
На его основе определяется сколько рендерить строк, чтобы заполнить видимую область с учётом скроллинга.
Список строк задаётся свойством `rows()` и может представлять из себя как массив так и ленивый диапазон ([$mol_range](../range)).

[Online demo](http://eigenmethod.github.io/mol/#demo=mol_lister_demo)