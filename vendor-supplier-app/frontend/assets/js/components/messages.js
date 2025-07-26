            document.getElementById('messageDetail').classList.remove('hidden');
            document.getElementById('messageDetailTitle').textContent = message.subject;
            document.getElementById('messageDetailSender').textContent = message.sender;
            document.getElementById('messageDetailTime').textContent = `Received: ${message.time}`;
            document.getElementById('messageDetailContent').textContent = message.preview;
            
            // Update UI
            document.querySelector(`.message-item:nth-child(${messages.indexOf(message) + 1})`).classList.remove('bg-blue-50');
            
            // In a real app, we would mark as read in the backend
        }
    }
    // Search functionality
    messageSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = messages.filter(msg => 
            msg.sender.toLowerCase().includes(searchTerm) || 
            msg.subject.toLowerCase().includes(searchTerm) ||
            msg.preview.toLowerCase().includes(searchTerm)
        );
        renderMessages(filtered);
    });
    // Close message detail
    document.getElementById('closeMessageDetail').addEventListener('click', () => {
        document.getElementById('messageDetail').classList.add('hidden');
    });
    // Initial render
    renderMessages();
}
