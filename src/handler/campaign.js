import axios from 'axios';
import { config } from '../config.js';
import { PermanentError } from '../errors.js';
import fs from 'node:fs/promises';

export async function campaignCreateLeads(payload) {
    try {
        const res = await axios.post(config.crm.createLeadsUrl, payload, {
            auth: {
                username: config.crm.username,
                password: config.crm.password,
            },
            timeout: config.http.timeoutMs,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        await fs.appendFile('log/crm_success.log', `CRM success: ${JSON.stringify(res.data)}\n`);
        return res.data;
    } catch (err) {
        if (err.response) {
            const status = err.response.status;
            const body = JSON.stringify(err.response.data);

            if (status >= 400 && status < 500 && status !== 408 && status !== 429) {
                await fs.appendFile('log/crm_error.log', `CRM rejected ${status}: ${body}\n`);
                throw new PermanentError(`CRM rejected ${status}: ${body}`);
            }
            await fs.appendFile('log/crm_error.log', `CRM transient ${status}: ${body}\n`);
            throw new Error(`CRM transient ${status}: ${body}`);
        }
        await fs.appendFile('log/crm_error.log', `CRM unreachable: ${err.code || err.message}\n`);
        throw new Error(`CRM unreachable: ${err.code || err.message}`);
    }
} 