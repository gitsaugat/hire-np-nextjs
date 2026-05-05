export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, company, country, subject, message } = body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return Response.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    // In a real implementation, you would send an email here using a service like Resend/SendGrid
    // console.log('Contact form submission received:', body);
    
    return Response.json({ 
      success: true,
      message: 'Message received. We will respond within 24 hours.'
    });
  } catch (error) {
    return Response.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
