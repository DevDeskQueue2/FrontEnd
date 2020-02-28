const tickets = [
    createTicket('Help with laptop', 'My laptop is not starting up', 'I have tried restarting', 'Other'),
    createTicket('My account is locked', 'I cannot access my account', 'N/A', 'Other'),
    createTicket('Component issues', 'React will not load my component', 'Re-installing node_modules', 'React'),
    createTicket('Need cash', 'My bank account is running dry', 'Working', 'Financial')
]

function createTicket(title, description, tried, category) {
    return {
        title,
        description,
        tried, 
        category,
        status: 'Un-Assigned',
        dateAdded: Date.now(),
        author: 'Student #1',
        helper: ''
    }
}

export default tickets;