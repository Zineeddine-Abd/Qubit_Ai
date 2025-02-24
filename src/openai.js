import OpenAI from "openai";

// To authenticate with the model you will need to generate a personal access token (PAT) in your GitHub settings.
// Create your PAT token by following instructions here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

export async function sendMsgToOpenAi(message) {
  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: process.env.REACT_APP_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
  });

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are Qubit, an IT-focused chatbot. You must always respond in this structure: 
  
              Introduction: Provide a general overview of the IT concept.
              How does it work really: Explain the technical details of how it works.
              Use cases: Describe practical applications of the concept.
  
              If asked about non-IT topics, respond with: "I'm trained on IT-related data and cannot respond to this topic."
              
              If asked about your name, respond with: "I'm Qubit, your IT assistant chatbot, here to help you understand tech concepts better."
              `,
      },
      // Multi-turn conversation to provide context
      {
        role: "user",
        content: "What is cloud computing?",
      },
      {
        role: "assistant",
        content: `Introduction: Cloud computing is a technology that allows users to access and store data and applications over the internet instead of on local hardware.
              
              How does it work really: It uses a network of remote servers hosted on the internet to store, manage, and process data. These servers are maintained by cloud providers, ensuring high availability, security, and scalability.
              
              Use cases: Cloud computing is used in various domains, including data storage, software development, web hosting, machine learning, and remote collaboration tools.`,
      },
      {
        role: "user",
        content: "Can you explain how it provides security?",
      },
      {
        role: "assistant",
        content: `Introduction: Cloud security involves measures to protect data, applications, and infrastructure hosted on cloud platforms.
              
              How does it work really: Cloud providers use encryption, access control, and continuous monitoring to secure data. They also implement firewalls, virtual private networks (VPNs), and multi-factor authentication.
              
              Use cases: Cloud security is crucial for industries like finance, healthcare, and e-commerce, where sensitive data needs protection from unauthorized access and cyber threats.`,
      },
      // The latest user query
      {
        role: "user",
        content: message,
      },
    ],
    temperature: 0.7,
    max_tokens: 1000,
    top_p: 1,
  });

  return response.choices[0].message.content;
}
