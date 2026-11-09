import { useRef, useState, useEffect } from "react"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const emailRegex = /^[a-zA-Z0-9._%+-]+@ipari\.vein\.hu$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Regisztracio(){
    return (
        <>
            <h1>Regisztráció</h1>
        </>
    )
}