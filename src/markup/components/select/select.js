import 'select2';

$('.e-select2__select-number > .select__select').select2({
    minimumResultsForSearch: -1, // Скрыть поиск
    width: '100%',
    placeholder: 'Выберите что нибудь уже'
    // tags: true // запоминать выбор
});

// $('.e-select2__select-rep > .select__select').select2({
//     width: '100%',
//     placeholder: 'Найти репозиторий',
//     ajax: {
//         url: 'https://api.github.com/search/repositories',
//         dataType: 'json'
//         // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
//     }
//     // tags: true // запоминать выбор
// });

