export const formatarMoeda = (v: number) => {
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const prepararData = (dataCustom: string, createdAt: string) => {
    const dataRef = dataCustom || createdAt;
    let dataObj = dataCustom ? new Date(dataRef + 'T12:00:00') : new Date(dataRef);

    return {
        dia: dataObj.getDate().toString().padStart(2, '0'),
        mes: (dataObj.getMonth() + 1).toString().padStart(2, '0'),
        ano: dataObj.getFullYear(),
        formatada: `${dataObj.getDate().toString().padStart(2, '0')}/${(dataObj.getMonth() + 1).toString().padStart(2, '0')}`
    };
};