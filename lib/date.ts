export function generateDateOptions(daysCount = 7) {
  const options = [];
  const today = new Date();

  for (let i = 0; i < daysCount; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    // Format YYYY-MM-DD
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    // Date (Fri, Sat, Sun...)
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });

    // Label display (Today, Tomorrow, or "19 Jul")
    let label = "";
    if (i === 0) label = "Today";
    else if (i === 1) label = "Tomorrow";
    else
      label = d.toLocaleDateString("en-US", { day: "numeric", month: "short" });

    options.push({
      date: dateStr,
      dayName,
      dayNumber: day,
      label,
    });
  }
  return options;
}
