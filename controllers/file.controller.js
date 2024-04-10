const fs = require("fs");
const crypto = require("crypto");
const fsPath = require("path");

const saveFile = (req, res) => {
  const { path } = req.file;
  if (!path)
    res.status(422).json({ msg: `Caminho do arquivo nao encontrado.` });

  let hash = HashFile(path, "sha256");
  if (hash) {
    fs.writeFileSync(`fileHashContent/${hash}`, "");
    res.status(201).json({
      msg: `Arquivo criptografado com sucesso. [Hash do arquivo]${hash}`,
    });
  }
};

const validateFile = (req, res) => {
  const { path } = req.file;
  if (!path)
    res.status(422).json({ msg: `Caminho do arquivo nao encontrado.` });

  let hash = HashFile(path, "sha256");

  // Listando os arquivos da pasta de forma síncrona
  const files = fs.readdirSync(`fileHashContent/`);

  // Iterando sobre os arquivos encontrados
  files.forEach((file) => {
    const filePath = fsPath.join(`fileHashContent/`, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile() && file === hash) {
      res.status(200).json({ msg: `Copia autenticada. [Hash]=>${hash}` });
    } else res.status(422).json({ msg: `Copia invalida.` });
  });
};

function HashFile(caminhoArquivo, algoritmo) {
  try {
    // Leitura síncrona do arquivo
    const data = fs.readFileSync(caminhoArquivo);

    // Criando o hash SHA-256
    const hash = crypto.createHash(algoritmo);
    hash.update(data);

    // Retornando o hash em formato hexadecimal
    return hash.digest("hex");
  } catch (error) {
    console.error("Erro ao calcular hash:", error);
    return null;
  }
}

module.exports = { saveFile, validateFile };
