document.getElementById('analyze-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const url = document.getElementById('text-input').value;
  
  // إرسال طلب لتحليل النص من خلال URL
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })  // إرسال الرابط بدلاً من النص المباشر
  });
  
  const data = await response.json();
  
  // عرض النتائج
  document.getElementById('results').innerHTML = `
    <p>Sentiment: ${data.sentiment}</p>
    <p>Content Type: ${data.contentType}</p>
    <p>Entities: ${data.entities}</p>
  `;
});
