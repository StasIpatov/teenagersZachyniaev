let search = document.getElementById('search');

search.addEventListener('change', function() {
  let searchV = search.value;
  console.log('Вибрано категорію:', searchV);

  // Знайдемо всі картки
  let people = document.querySelectorAll('.person');

  people.forEach(person => {
    let roles = person.dataset.role.split(',');

    // якщо "Усі" або співпадає з будь-якою роллю
    if (searchV == 0 || roles.includes(searchV)) {
      person.style.display = 'block';
    } else {
      person.style.display = 'none';
    }
  });
});