"use client"

import Modal from "../ui/Modal.jsx";
import Button from "../ui/Button.jsx";
import {useEffect, useState} from "react";

export default function ProductDelete({onClose, onConfirmed}) {


    return (
        <Modal title={"Deseja Excluir o Produto?"} onClose={onClose} className={"flex gap-4 flex-col"} >
            <p>Você irá deletar esse produto após confirmar!</p>
            <div className={"flex items-center justify-end gap-4"}>
                <Button className={"bg-status-danger hover:bg-status-danger-hover text-white"} onClick={onClose}>Cancelar</Button>
                <Button className={"text-white bg-status-success hover:bg-status-success/80"} onClick={onConfirmed} >Confirmar</Button>
            </div>
        </Modal>
    );
}