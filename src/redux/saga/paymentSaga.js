export const fetchPaymentUrl = async (email, id) => {
  const response = await fetch(
    'https://illuma-ai-gdcyh9andwarg9b8.canadacentral-01.azurewebsites.net/pay',
    {
      method: 'POST', // Change to POST
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify({email: email, package: id}), // Send id and email in the request body
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch payment URL');
  }

  return await response.json();
};
