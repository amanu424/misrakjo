const Client = require('../models/client');

class ClientRepository {
    async createClient(data) {
        const client = new Client(data);
        return await client.save();
    }

    async getAllClients() {
        return await Client.find().sort({ name: 1 });
    }

    async getClientById(id) {
        return await Client.findById(id);
    }

    async updateClient(id, updateData) {
        return await Client.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteClient(id) {
        return await Client.findByIdAndDelete(id);
    }
}

module.exports = new ClientRepository();