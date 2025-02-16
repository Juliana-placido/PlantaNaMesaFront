import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Produto from "../../../models/Produto";
import { busca } from "../../../services/Service";
import "./ListaProduto.css";
import { toast } from "react-toastify";
import { TokenState } from "../../../store/tokens/TokensReducer";
import { Box, Grid } from "@mui/material";

function ListaProduto() {
  const navigate = useNavigate();
  const [produto, setProduto] = useState<Produto[]>([]);
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );

  async function getProduto() {
    await busca("/produtos", setProduto, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    getProduto();
  }, [produto.length]);

  useEffect(() => {
    if (token == "") {
      toast.error("Você precisa estar logado", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
      navigate("/login");
    }
  }, [token]);

  return (
    <>
      {produto.map((produto) => (
        <>
          <Grid className="flip-card">
            
            <Box className="flip-card-inner">
             
              <Box className="flip-card-front">
                <img src={produto.foto} alt="" className="img" />
              </Box>
             
              <Box className="flip-card-back">
                <Typography color="textSecondary" gutterBottom>
                  Produto
                </Typography>

                <Typography variant="body2" component="p">
                  Usuário: {produto.usuario?.nome}
                </Typography>

                <Typography variant="body2" component="p">
                  Nome: {produto.nome}
                </Typography>

                {/* <Typography variant="body2" component="p">
                        Categoria: {produto.categoria?.nome}
                        </Typography>

                    <Typography variant="body2" component="p">
                    Descrição: {produto.descricao}
                    </Typography> */}

                <Typography variant="body2" component="p">
                  Valor: ${produto.valor}
                </Typography>

                <Box display="flex" justifyContent="center" mb={1.5}>
                  <Link
                    to={`/cadastrarprodutos/${produto.id}`}
                    className="text-decorator-none"
                  >
                    <Box mx={1}>
                      <Button
                        variant="contained"
                        className="marginLeft"
                        size="small"
                        color="primary"
                      >
                        Atualizar
                      </Button>
                    </Box>
                  </Link>
                  <Link
                    to={`/deletarProduto/${produto.id}`}
                    className="text-decorator-none"
                  >
                    <Box mx={1}>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                      >
                        Deletar
                      </Button>
                    </Box>
                  </Link>
                  <Link
                    to={`/produtos/${produto.id}`}
                    className="text-decorator-none"
                  >
                    <Box mx={1}>
                      <Button variant="contained" size="small" color="default">
                        Detalhar
                      </Button>
                    </Box>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
          
          <Box m={2}></Box>
          
        </>
      ))}
    </>
  );
}
export default ListaProduto;
