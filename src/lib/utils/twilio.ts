import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } from '$env/static/private';
import Twilio from 'twilio';

const twilio = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export default twilio;
