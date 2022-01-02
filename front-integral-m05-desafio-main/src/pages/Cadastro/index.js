import React, { useState, useEffect } from 'react'
import ButtonRosa from '../../components/ButtonRosa';
import './styles.css';
import FormCadastroStep1 from '../../components/FormCadastroStep1';
import FormCadastroStep2 from '../../components/FormCadastroStep2';
import CadastroRealizado from '../../components/CadastroRealizado';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import useCadastro from '../../hooks/useCadastroProvider';
import { ToastContainer, toast } from 'react-toastify';
import validator from 'validator'
import { Link } from 'react-router-dom';


export default function Cadastro() {

  const { nomeCadastro, setNomeCadastro, emailCadastro, setEmailCadastro, senhaCadastro, setSenhaCadastro, confirmaSenhaCadastro, setConfirmaSenhaCadastro } = useCadastro();

  const [erroNome, setErroNome] = useState(false);
  const [erroEmail, setErroEmail] = useState(false);

  const [erroSenha, setErroSenha] = useState(false);
  const [erroConfirmaSenha, setErroConfirmaSenha] = useState(false);

  const steps = ['Cadastre-se', 'Escolha uma senha', 'Cadastro realizado com sucesso'];
  const [activeStep, setActiveStep] = useState(0);
  const [formAtual, setFormAtual] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [nomeBotao, setNomeBotao] = useState('Continuar');
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  useEffect(() => {
    function definirNomeBotao() {
      if (activeStep === 1) {
        setNomeBotao('Cadastrar')
      } else if (activeStep > 1) {
        setNomeBotao('Ir para login')
        setActiveStep(3)
      }
    }
    definirNomeBotao();

  }, [activeStep]);

  async function handleNext(e) {
    e.preventDefault()
    if (activeStep === 0) {
      if (nomeCadastro.length < 5) {
        return setErroNome(true);
      } else {
        setErroNome(false);
      }
      if (!validator.isEmail(emailCadastro)) {
        return setErroEmail(true);
      } else {
        setErroEmail(false);
      }
    }

    if (activeStep === 1) {
      if (senhaCadastro !== confirmaSenhaCadastro) {
        setErroSenha(true);
        return toast.warning('As senhas diferem!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        setErroSenha(false);
      }

      if (senhaCadastro.length < 3 || confirmaSenhaCadastro.length < 3) {
        setErroSenha(true);
        setErroConfirmaSenha(true);
        return toast.warning('Insira uma senha com pelo menos 3 caracteres!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        setErroSenha(false);
        setErroConfirmaSenha(false);
      }

      const promise = await fetch('https://back-end-equipe15.herokuapp.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nomeCadastro,
          password: senhaCadastro,
          email: emailCadastro
        })
      });

      const response = await promise.json();

      if(response.mensagem === "Já existe usuário cadastrado com o e-mail informado.") {
        setErroEmail(true);
        toast.warning('Email já cadastrado!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        return setActiveStep((prevActiveStep) => prevActiveStep - 1);
      }
    }


    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  return (
    <main className="tela_cadastro">
      <ToastContainer
        className="toast-error"
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      <section className="tela_cadastro_esquerda">
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            </Box>
          </React.Fragment>
        )}
      </section>
      <section className="tela_cadastro_direita">
        <form>
          {activeStep === 0 ? <FormCadastroStep1
            nomeCadastro={nomeCadastro}
            setNomeCadastro={setNomeCadastro}
            emailCadastro={emailCadastro}
            setEmailCadastro={setEmailCadastro}
            formAtual={formAtual}
            setFormAtual={setFormAtual}
            erroNome={erroNome}
            erroEmail={erroEmail}
            /> : null}

          {activeStep === 1 ?
            <FormCadastroStep2
              senhaCadastro={senhaCadastro}
              setSenhaCadastro={setSenhaCadastro}
              confirmaSenhaCadastro={confirmaSenhaCadastro}
              setConfirmaSenhaCadastro={setConfirmaSenhaCadastro}
              erroSenha={erroSenha}
              erroConfirmaSenha={erroConfirmaSenha}
            /> : null}

          {activeStep >= 2 ? <CadastroRealizado /> : null}

          <div
            className="tela_login_direita_div_botao"
            onClick={e => handleNext(e)}
            style={{ display: activeStep >= 2 ? 'none' : '' }}
          >
            <ButtonRosa texto={nomeBotao} />
          </div>

          <div
            className="tela_login_direita_div_botao"
            style={{ display: activeStep >= 2 ? '' : 'none' }}
          >
            <Link to="/login"><ButtonRosa texto={nomeBotao} /></Link>
          </div>

        </form>
      </section>
    </main>
  )
}