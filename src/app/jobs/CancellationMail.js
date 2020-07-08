import Mail from "../../lib/Mail";
import {parseISO, format} from "date-fns";
import pt from "date-fns/locale/pt";


class CancellationMail {
    get key() {
        return 'CancellationMail'
    }

    async handle({data}) {
        const {appointment} = data;

        console.log('Executou');

        await Mail.sendMail({
            to: `${appointment.provider.name} <${appointment.provider.email}>`,
            subject: 'Agendamento cancelado',
            template: 'cancellation',
            context: {
                provider: appointment.provider.name,
                user: appointment.user.name,
                date: format(
                    parseISO(appointment.date),
                    "dd 'de' MMM', às' H:mm'h",
                    {locale: pt}
                )
            },
        });
    }
}

export default new CancellationMail();