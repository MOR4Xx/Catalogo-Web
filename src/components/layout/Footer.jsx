import Image from "next/image";
import Logo from "@/public/images/LogoVelikaVerticalMenor.png";
import Instagram from "@/public/icons/instagram.svg"
import Facebook from "@/public/icons/facebook.svg"
import Whatsapp from "@/public/icons/whatsapp.svg"
import Pix from "@/public/icons/Pix.svg"
import Visa from "@/public/icons/Visa.svg"
import Master from "@/public/icons/Master.svg"
import Elo from "@/public/icons/Elo.svg"

export default function Footer() {
    const linkClass = "hover:text-primary cursor-pointer hover:underline"

    return (
        <div className="flex flex-col bg-status-escuro max-w-7xl mx-auto mb-2 p-2 rounded-lg gap-4 mt-10">
            <div className={"w-full mx-auto flex flex-row justify-between p-4 gap-10 bg-white pt-6 rounded-lg"}>
                <div>
                    <h3 className="font-semibold mb-2 cursor-default">Atendimento</h3>
                    <ul className="space-y-2 ">
                        <li><a className={linkClass}>Endereço</a></li>
                        <li><a className={linkClass}>Horário</a></li>
                        <li><a className={linkClass}>WhatsApp</a></li>
                        <li><a className={linkClass}>Telefone</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-2 cursor-default">Serviços</h3>
                    <ul className="space-y-2">
                        <li>Pressão arterial</li>
                        <li>Glicemia</li>
                        <li>Injetáveis</li>
                        <li>Remédios manipulados</li>
                        <li>Entrega a domicilio</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-2 cursor-default">Institucional</h3>
                    <ul className="space-y-2">
                        <li><a className={linkClass}>Home</a></li>
                        <li><a className={linkClass}>Sobre a Farmácia</a></li>
                        <li><a className={linkClass}>Política de Privacidade</a></li>
                        <li><a className={linkClass}>Termos de Uso</a></li>
                        <li><a className={linkClass}>FAQ</a></li>
                        <li><a className={linkClass}>Contato</a></li>
                    </ul>
                </div>
                <div>
                    <div className="cursor-default">
                        <h3 className="font-semibold mb-1 cursor-default">Formas de pagamento</h3>
                        <p>Parcele em até 3x* sem juros nos cartões de crédito</p>
                        <ul className="space-y-2 flex flex-row gap-2">
                            <li><Image className="max-w-10 h-auto" src={Pix} alt={"Instagram"}/></li>
                            <li><Image className="max-w-10 h-auto" src={Master} alt={"Facebook"}/></li>
                            <li><Image className="max-w-10 h-auto" src={Visa} alt={"WhatsApp"}/></li>
                            <li><Image className="max-w-10 h-auto" src={Elo} alt={"WhatsApp"}/></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2 cursor-default">Redes Sociais</h3>
                        <ul className="space-y-2 flex flex-row gap-2">
                            <li><a href={"https://www.instagram.com/velika.ti"} target="_blank"
                                   rel="noopener noreferrer"
                                   className={linkClass}>
                                <Image className="max-w-6 h-auto" src={Instagram} alt={"Instagram"}/>
                            </a></li>
                            <li><a href={""} target="_blank"
                                   rel="noopener noreferrer"
                                   className={linkClass}>
                                <Image className="max-w-6 h-auto" src={Facebook}
                                       alt={"Facebook"}/>
                            </a></li>
                            <li><a href={""} target="_blank"
                                   rel="noopener noreferrer"
                                   className={linkClass}>
                                <Image className="max-w-6 h-auto"
                                       src={Whatsapp}
                                       alt={"WhatsApp"}/>
                            </a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={"flex flex-row justify-between"}>
                <Image src={Logo} alt={"Velika"} className="w-40 h-auto"/>

                <div className="flex flex-col text-[10px] leading-tight text-gray-600">
                    <p>© 2026 Farmácia Velika. Todos os direitos reservados.</p>
                    <p>CNPJ: XX.XXX.XXX/0001-XX</p>
                </div>
            </div>
        </div>
    );
}