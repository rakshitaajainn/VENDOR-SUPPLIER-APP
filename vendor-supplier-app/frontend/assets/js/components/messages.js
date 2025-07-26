function initMessages() {
    // Initialize message functionality
    const messageList = document.getElementById('messageList');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const chatContainer = document.getElementById('chatContainer');

    // Sample messages data
    const messages = [
        {
            id: 1,
            sender: 'customer',
            text: 'Hello, I would like to inquire about bulk pricing for your industrial motors.',
            time: '10:30 AM',
            read: true
        },
        {
            id: 2,
            sender: 'me',
            text: 'Sure! We offer discounts starting at 20 units. What quantity are you considering?',
            time: '10:32 AM',
            read: true
        },
        {
            id: 3,
            sender: 'customer',
            text: 'We need about 50 units initially. Could you share the pricing for that quantity?',
            time: '10:35 AM',
            read: false
        }
    ];

    // Render messages
    function renderMessages() {
        messageList.innerHTML = '';
        messages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.className = `flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} mb-4`;
            messageElement.innerHTML = `
                <div class="${msg.sender === 'me' ? 'bg-primary-100 chat-bubble-self' : 'bg-white chat-bubble'} rounded-lg p-4 max-w-xs md:max-w-md shadow">
                    <div class="text-sm ${msg.sender === 'me' ? 'text-primary-800' : 'text-gray-800'}">${msg.text}</div>
                    <div class="text-xs mt-1 flex justify-between items-center ${msg.sender === 'me' ? 'text-primary-600' : 'text-gray-500'}">
                        <span>${msg.time}</span>
                        ${msg.sender === 'me' ? 
                            `<i class="fas fa-check${msg.read ? '-double text-blue-500' : ''} ml-2"></i>` : 
                            ''}
                    </div>
                </div>
            `;
            messageList.appendChild(messageElement);
        });
        
        // Scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Send new message
    if (messageForm) {
        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const messageText = messageInput.value.trim();
            
            if (messageText) {
                messages.push({
                    id: messages.length + 1,
                    sender: 'me',
                    text: messageText,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    read: false
                });
                
                messageInput.value = '';
                renderMessages();
                
                // Simulate reply after 1-3 seconds
                setTimeout(() => {
                    const replies = [
                        "I'll check with our team and get back to you.",
                        "That sounds good. When do you need them by?",
                        "We can offer 12% discount for 50 units."
                    ];
                    const randomReply = replies[Math.floor(Math.random() * replies.length)];
                    
                    messages.push({
                        id: messages.length + 1,
                        sender: 'customer',
                        text: randomReply,
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        read: true
                    });
                    renderMessages();
                }, 1000 + Math.random() * 2000);
            }
        });
    }

    // Render initial messages
    renderMessages();

    // Conversation list functionality
    const conversationItems = document.querySelectorAll('.conversation-item');
    conversationItems.forEach(item => {
        item.addEventListener('click', () => {
            conversationItems.forEach(i => i.classList.remove('bg-primary-50'));
            item.classList.add('bg-primary-50');
            
            // In a real app, we would load the conversation messages here
            document.getElementById('currentConversation').textContent = 
                item.querySelector('.conversation-name').textContent;
        });
    });

    // Mark as read functionality
    const markAsRead = document.getElementById('markAsRead');
    if (markAsRead) {
        markAsRead.addEventListener('click', () => {
            messages.forEach(msg => msg.read = true);
            renderMessages();
        });
    }
}

if (typeof initMessages === 'function') {
    document.addEventListener('DOMContentLoaded', initMessages);
}
