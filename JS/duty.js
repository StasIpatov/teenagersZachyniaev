function getNextMonday() {
  const today = new Date();
  const day = today.getDay();
  const diff = (8 - day) % 7; // скільки днів до наступного понеділка
  const monday = new Date(today);
  monday.setDate(today.getDate() + diff);
  return monday.toISOString().slice(0, 10);
}

fetch("JSON/duty.json")
  .then(r => r.json())
  .then(data => {
    const weekKeys = Object.keys(data.weeks).sort(); // сортуємо дати
    const today = new Date();
    
    // шукаємо найближчий майбутній понеділок у списку
    let currentKey = weekKeys.find(date => new Date(date) >= today);

    if (!currentKey) {
      // якщо майбутніх немає — беремо останній (щоб не залишитись без даних)
      currentKey = weekKeys[weekKeys.length - 1];
    }

    const dutyList = data.weeks[currentKey] || [];
    console.log("✅ Поточний/наступний тиждень:", currentKey, "->", dutyList);

    dutyList.forEach(id => {
      const card = document.getElementById(id);
      if (card) {
        card.dataset.role = card.dataset.role
          ? card.dataset.role + ",5"
          : "5";
        card.classList.add("current-duty");
      }
    });
  });
