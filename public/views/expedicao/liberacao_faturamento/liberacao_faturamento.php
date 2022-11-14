<?php

    $gerar_pedido = "
    INSERT INTO
        PEDIDO_FAT(
            PEDF_EMP_ID,
            PEDF_ID,
            PEDF_CVTO_EMP_ID,
            PEDF_CVTO_ID,
            PEDF_OPER_EMP_ID,
            PEDF_OPER_ID,
            PEDF_LIQU_EMP_ID,
            PEDF_LIQU_ID,
            PEDF_USR_ID,
            PEDF_GEN_TGEN_ID_FORMA_PGTO_DE,
            PEDF_GEN_EMP_ID_FORMA_PGTO_DE,
            PEDF_GEN_ID_FORMA_PGTO_DE,
            PEDF_SITUACAO,
            PEDF_FLAG_EMIS,
            PEDF_PROCED,
            PEDF_VLR_FRETE,
            PEDF_DTA_ENTREGA,
            PEDF_VLR_TOT_PED,
            PEDF_DTA_CAD,
            PEDF_EMP_ID_EMP_DEST_DE,
            PEDF_CLI_ID,
            PEDF_CLI_EMP_ID,
            PEDF_FORN_ID,
            PEDF_GEN_TGEN_ID,
            PEDF_GEN_EMP_ID,
            PEDF_GEN_ID,
            PEDF_GEN_TGEN_ID_ROTA_DE,
            PEDF_GEN_TGEN_ID_SETOR_DE,
            PEDF_GEN_EMP_ID_ROTA_DE,
            PEDF_GEN_EMP_ID_SETOR_DE,
            PEDF_GEN_ID_ROTA_DE,
            PEDF_GEN_ID_SETOR_DE,
            PEDF_GEN_TGEN_ID_SIT_CLI_DE,
            PEDF_GEN_EMP_ID_SIT_CLI_DE,
            PEDF_GEN_ID_SIT_CLI_DE,
            PEDF_GEN_TGEN_ID_TB_FRETE_DE,
            PEDF_GEN_EMP_ID_TB_FRETE_DE,
            PEDF_GEN_ID_TB_FRETE_DE,
            PEDF_GEN_TGEN_ID_AREA_DE,
            PEDF_GEN_EMP_ID_AREA_DE,
            PEDF_GEN_ID_AREA_DE,
            PEDF_GEN_TGEN_ID_MOT_DEVOL_DE,
            PEDF_GEN_EMP_ID_MOT_DEVOL_DE,
            PEDF_GEN_ID_MOT_DEVOL_DE,
            PEDF_GEN_TGEN_ID_TP_BONIF_DE,
            PEDF_GEN_EMP_ID_TP_BONIF_DE,
            PEDF_GEN_ID_TP_BONIF_DE,
            PEDF_PES_ID,
            PEDF_PES_EMP_ID,
            PEDF_GEN_TGEN_ID_MENS_1_DE,
            PEDF_GEN_EMP_ID_MENS_1_DE,
            PEDF_GEN_ID_MENS_1_DE,
            PEDF_GEN_TGEN_ID_MENS_2_DE,
            PEDF_GEN_EMP_ID_MENS_2_DE,
            PEDF_GEN_ID_MENS_2_DE,
            PEDF_GEN_TGEN_ID_MENS_3_DE,
            PEDF_GEN_EMP_ID_MENS_3_DE,
            PEDF_GEN_ID_MENS_3_DE,
            PEDF_CLIAND_ID,
            PEDF_CLIAND_CLI_ID,
            PEDF_CLIAND_CLI_EMP_ID,
            PEDF_NR_NF,
            PEDF_SERIE_NF,
            PEDF_NR_NF_DEV,
            PEDF_SERIE_NF_DEV,
            PEDF_ADC_FIN,
            PEDF_NF_COBERT,
            PEDF_VLR_DESC,
            PEDF_OBS,
            PEDF_VLR_DESP,
            PEDF_VLR_SEG,
            PEDF_ATU_ESTAT_M,
            PEDF_ATU_ESTAT_D,
            PEDF_ATU_LIVROF,
            PEDF_ATU_COMIS,
            PEDF_SELO,
            PEDF_SERIE_SELO,
            PEDF_SELO_RET,
            PEDF_VLR_DESC_BOLETO,
            PEDF_LIB_ANALISTA,
            PEDF_DIAS_CARENCIA,
            PEDF_RET_CARGA,
            PEDF_BOLETO,
            PEDF_TIPO_PED,
            PEDF_REL_EXP_CARGA,
            PEDF_PESO_BRUTO_TOTAL,
            PEDF_QTD_CAIXA_TOTAL,
            PEDF_CLIEP_PLACA,
            PEDF_CLIEP_CLI_ID,
            PEDF_CLIEP_CLI_EMP_ID,
            PEDF_CONF_WMS,
            PEDF_FRETE_COMBINADO,
            PEDF_COMISSAO,
            PEDF_PRINCIPAL,
            PEDF_TP_VENCIMENTO,
            PEDF_FAZ_COD_FAZENDA,
            PEDF_FAZ_CLI_ID,
            PEDF_FAZ_CLI_EMP_ID,
            PEDF_FAZ_EMP_ID,
            PEDF_LIQU_EMP_ID_LIQUIDACAO_OR,
            PEDF_LIQU_ID_LIQUIDACAO_ORIGEM,
            PEDF_NR_ORCA,
            PEDF_DTA_EMIS,
            PEDF_EMPENHO,
            PEDF_ATU_CTA_GRAF,
            PEDF_ORIGEM,
            PEDF_ORIGEM_NUMERO,
            PEDF_ATU_CONTAB,
            PEDF_PECON_EMP_ID,
            PEDF_PECON_ID,
            PEDF_FRO_ID,
            PEDF_FRO_EMP_ID,
            PEDF_PRE_PEDIDO,
            PEDF_PCON_EMP_ID,
            PEDF_PCON_ID,
            PEDF_ATU_ESTAT_E,
            PEDF_ATUALIZA_CONSIG,
            PEDF_DTA_VCTO_CONSIG,
            PEDF_COB_ID,
            PEDF_COB_EMP_ID,
            PEDF_CLI_ANT_ID,
            PEDF_CLI_ANT_EMP_ID,
            PEDF_AGENDAMENTO,
            PEDF_AGD_EMP_ID,
            PEDF_AGD_ID,
            PEDF_AGD_DATA,
            PEDF_FROT_EMP_ID_RDESP,
            PEDF_FROT_ID_RDESP,
            PEDF_FLAG_FRETE,
            PEDF_FLAG_SEGURO,
            PEDF_FLAG_DESP_ICMS,
            PEDF_VLR_BASE_SEG,
            PEDF_FLG_RETIRA,
            PEDF_IMP_LAYOUT,
            PEDF_APROV_REGRAS,
            PEDF_USR_ID_APROV_REGRAS,
            PEDF_DTA_APROV_REGRAS,
            PEDF_EMPR_GEN_ID_DEV,
            PEDF_EMPR_GEN_TGEN_ID_DEV,
            PEDF_EMPR_GEN_EMP_ID_DEV,
            PEDF_EMPR_EMP_ID_DEV,
            PEDF_EMPR_DOCUM_DEV,
            PEDF_EMPR_FLG_BAIXA,
            PEDF_SEQ_RSHOW,
            PEDF_VLR_FUNDO_POBREZA,
            PEDF_GEN_EMP_ID_GRP_DESP,
            PEDF_GEN_TGEN_ID_GRP_DESP,
            PEDF_GEN_ID_GRP_DESP,
            PEDF_VLR_FRETE_ESP,
            PEDF_EDI_NR_PEDIDO,
            PEDF_EDI_NR_PEDIDO_EMP_ID,
            PEDF_ID_ORIGEM,
            PEDF_PEDC_NR_PEDIDO,
            PEDF_ID_DEVOL,
            PEDF_EMP_ID_DEVOL,
            PEDF_VLR_TOT_DESC_ESP_DUPL,
            PEDF_ATU_CTA_GRAF_DEV,
            PEDF_DTA_LIB,
            PEDF_GEN_ID_ROTA_ANT,
            PROF_ALIQ_IPI_DIFERENCIADA,
            PEDF_VLR_DESC_ESP_DUPL,
            PEDF_REPLICA_PDF,
            PEDF_GEN_TGEN_ID_MOT_ENTR_DE,
            PEDF_GEN_EMP_ID_MOT_ENTR_DE,
            PEDF_GEN_ID_MOT_ENTR_DE,
            PEDF_FORN_EMP_ID,
            PEDF_IMP_SIMPLE_REM_VAZ,
            PEDF_TP_FRETE,
            PEDF_EXP_CONTAINER,
            PEDF_EXP_SELO,
            PEDF_FATURAMENTO,
            PEDF_NR_PATRIM,
            PEDF_PEDIDO_ANALISADO,
            PEDF_VLR_DOT_DESC_ESP_DUPL,
            PEDF_OBS2,
            PEDF_IMP_BASE_ICMS,
            PEDF_IMP_VLR_ICMS,
            PEDF_IMP_ALQ_ICMS,
            PEDF_IMP_BASE_PIS,
            PEDF_IMP_VLR_PIS,
            PEDF_IMP_ALQ_PIS,
            PEDF_IMP_BASE_COFINS,
            PEDF_IMP_VLR_COFINS,
            PEDF_IMP_ALQ_COFINS,
            PEDF_IMP_VLR_DI,
            PEDF_IMP_BASE_IPI,
            PEDF_IMP_VLR_IPI,
            PEDF_IMP_ALQ_IPI,
            PEDF_IMP_IMPORTACAO,
            PEDF_IMP_BASE_IMPOSTO,
            PEDF_DEV_ACERTO,
            PEDF_ENTR_ID,
            PEDF_ENTR_EMP_ID,
            PEDF_ANALISE_VAL_MIN,
            PEDF_ANALISE_LIBERAR,
            PEDF_ANALISE_ULTIMA_DTA,
            PEDF_FLAG_EBS,
            PEDF_ACERTO_DEV,
            PEDF_ACERTO_DEV_USR_ID,
            PEDF_ACERTO_DEV_DTA,
            PEDF_FLAG_FOX,
            PEDF_RESERVADO_EBS,
            PEDF_INSCRICAO_ESTADUAL,
            PEDF_PESAGEM,
            PEDF_CUPOM_FORTES,
            PEDF_VLR_TOT_MOEDA_ORIG,
            PEDF_VLR_TOT_SEM_DESC,
            PEDF_ANALISE_PERCENTUAL,
            PEDF_ANALISE_PRECO,
            PEDF_PES_ROTA_EMP_ID,
            PEDF_PES_ROTA_ID,
            PEDF_PES_SETOR_EMP_ID,
            PEDF_PES_SETOR_ID,
            PEDF_PES_USR_ID,
            PEDF_OBS_PES_ROTA,
            PEDF_OBS_PES_SETOR,
            PEDF_OBS_PES_USR,
            PEDF_COMIS_PES_USR,
            PEDF_COMIS_PES_ROTA,
            PEDF_COMIS_PES_SETOR,
            PEDF_OPER_COL_EMP_ID,
            PEDF_OPER_COL_ID,
            PEDF_OPER_COL_DESC,
            PEDF_PES_USR_EMP_ID,
            PEDF_VLR_FUNRURAL,
            PEDF_IMPORT,
            PEDF_USR_ID_DEVOLUCAO,
            PEDF_ALOCADO,
            PEDF_VLR_DESC_ORIGINAL,
            PEDF_LVR_OPER_BASE_CALC_ICM,
            PEDF_LVR_OPER_ALIQ_ICM_PROD,
            PEDF_LVR_OPER_TIPO_ICMR,
            PEDF_LVR_OPER_TIPO_ICM,
            PEDF_LVR_OPER_TIPO_IPI,
            PEDF_LVR_PARAM_DTA,
            PEDF_VERSAO_CALCULO,
            PEDF_LVR_OPER_TIPO_REDUCAO,
            PEDF_OPER_ALIQ_RED_BC_ICM_OE,
            PEDF_LVR_OPER_DIF_CRED_IPI,
            PEDF_LVR_OPER_DIF_RED_BC_ICM,
            PEDF_PEDL_EMP_ID,
            PEDF_PEDL_NR_LANC,
            PEDF_ACERTO_DEV_ENTR,
            PEDF_EMP_ID_DEV_ENTR,
            PEDF_ID_DEV_ENTR,
            PEDF_GERA_ESTOQUE_DTA_RETORNO,
            PEDF_APROV_CANCNFE,
            PEDF_JUSTIF_APRCANCNFE,
            PEDF_VLR_TOT_PED_BKP,
            PEDF_CPF_NFCE,
            PEDF_ID_ORIGEM2,
            PEDF_SERIE_NFCE,
            PEDF_XPED_ID,
            PEDF_ATU_EBS,
            PEDF_CLIENTE_NFCE,
            PEDF_CVTO_EMP_ID_RENEGOCIACAO,
            PEDF_CVTO_ID_RENEGOCIACAO,
            PEDF_DT_EMISSAO_RENEGOCIACAO,
            PEDF_CVTO_EMP_ID_ORIGEM,
            PEDF_CVTO_ID_ORIGEM,
            PEDF_VLR_TOT_DES_SUFRAMA,
            PEDF_VLR_ICMS_DES,
            PEDF_ALIQ_ICMS_DES,
            PEDF_CLI_IND_IE_DEST,
            PEDF_VLR_ICMS_FCP_UF_DEST_TOT,
            PEDF_VLR_ICMS_INT_UF_DEST_TOT,
            PEDF_VLR_ICMS_INT_UF_REMET_TOT,
            PEDF_CLI_UF_DESTINO,
            PEDF_GEN_ID_ARMZ,
            PEDF_GEN_EMP_ID_ARMZ,
            PEDF_GEN_TGEN_ID_ARMZ,
            PEDF_LIB_COM,
            PEDF_USR_ID_LIB_COM,
            PEDF_DTA_LIB_COM,
            PEDF_MOT_LIB_COM,
            PEDF_LIB_COM_OBS,
            PEDF_GEN_TGEN_ID_MOT_LIB_COM,
            PEDF_GEN_EMP_ID_MOT_LIB_COM,
            PEDF_GEN_ID_MOT_LIB_COM,
            OPEDF_ACERTO_DEV_ENTR,
            PEDF_LIB_ANALISTA_POS,
            PEDF_ID_MANIFESTO,
            PEDF_DTA_AGENDAMENTO,
            PEDF_LIB_VDA_FUT,
            PEDF_USR_ID_VDA_FUT,
            PEDF_DTA_LIB_VDA_FUT,
            PEDF_VLR_TOT_BOLETO_CFO,
            PEDF_CONSUMIDOR_FINAL,
            MI_PEDF_ORIGEM
        )
        (
    SELECT 
            PEDF_EMP_ID,
            :PEDF_ID_NOVO PEDF_ID, -- NOVO ID GERADO
            PEDF_CVTO_EMP_ID,
            1 PEDF_CVTO_ID, -- CONDIÇÃO DE VENCIMENTO A VISTA
            PEDF_OPER_EMP_ID,
            (SELECT
                MI.MI_OPER_FAT_ID
            FROM
                MI_PARAM_PROD_PEDIDO_AUT MI
                INNER JOIN OPERACAO_FAT F ON F.OPER_ID = MI.MI_OPER_FAT_ID
                AND F.OPER_EMP_ID = MI.MI_EMP_ID
                LEFT JOIN OPERACAO_EST E ON E.OPER_ID = F.OPER_OPER_E_ID
            WHERE
                MI_OPER_FAT_ID_REF = ORI.PEDF_OPER_ID AND MI_PROD_ID = 52 AND MI.MI_EMP_ID = 2) PEDF_OPER_ID,
            PEDF_LIQU_EMP_ID,
            PEDF_LIQU_ID,
            PEDF_USR_ID,
            9012 PEDF_GEN_TGEN_ID_FORMA_PGTO_DE, --PAGAMENTO GENER ID
            PEDF_GEN_EMP_ID_FORMA_PGTO_DE,
            1 PEDF_GEN_ID_FORMA_PGTO_DE, -- PAG A VISTA
            PEDF_SITUACAO,
            PEDF_FLAG_EMIS,
            PEDF_PROCED,
            0 PEDF_VLR_FRETE,
            PEDF_DTA_ENTREGA,
            0 PEDF_VLR_TOT_PED,
            PEDF_DTA_CAD,
            PEDF_EMP_ID_EMP_DEST_DE,
            PEDF_CLI_ID, -- SELECIONAR CLIENTE ESCOLHIDO
            PEDF_CLI_EMP_ID,
            PEDF_FORN_ID,
            PEDF_GEN_TGEN_ID,
            PEDF_GEN_EMP_ID,
            PEDF_GEN_ID,
            PEDF_GEN_TGEN_ID_ROTA_DE,
            PEDF_GEN_TGEN_ID_SETOR_DE,
            PEDF_GEN_EMP_ID_ROTA_DE,
            PEDF_GEN_EMP_ID_SETOR_DE,
            PEDF_GEN_ID_ROTA_DE,
            PEDF_GEN_ID_SETOR_DE,
            PEDF_GEN_TGEN_ID_SIT_CLI_DE,
            PEDF_GEN_EMP_ID_SIT_CLI_DE,
            PEDF_GEN_ID_SIT_CLI_DE,
            PEDF_GEN_TGEN_ID_TB_FRETE_DE,
            PEDF_GEN_EMP_ID_TB_FRETE_DE,
            PEDF_GEN_ID_TB_FRETE_DE,
            PEDF_GEN_TGEN_ID_AREA_DE,
            PEDF_GEN_EMP_ID_AREA_DE,
            PEDF_GEN_ID_AREA_DE,
            PEDF_GEN_TGEN_ID_MOT_DEVOL_DE,
            PEDF_GEN_EMP_ID_MOT_DEVOL_DE,
            PEDF_GEN_ID_MOT_DEVOL_DE,
            PEDF_GEN_TGEN_ID_TP_BONIF_DE,
            PEDF_GEN_EMP_ID_TP_BONIF_DE,
            PEDF_GEN_ID_TP_BONIF_DE,
            PEDF_PES_ID,
            PEDF_PES_EMP_ID,
            PEDF_GEN_TGEN_ID_MENS_1_DE,
            PEDF_GEN_EMP_ID_MENS_1_DE,
            PEDF_GEN_ID_MENS_1_DE,
            PEDF_GEN_TGEN_ID_MENS_2_DE,
            PEDF_GEN_EMP_ID_MENS_2_DE,
            PEDF_GEN_ID_MENS_2_DE,
            PEDF_GEN_TGEN_ID_MENS_3_DE,
            PEDF_GEN_EMP_ID_MENS_3_DE,
            PEDF_GEN_ID_MENS_3_DE,
            PEDF_CLIAND_ID,
            PEDF_CLIAND_CLI_ID,
            PEDF_CLIAND_CLI_EMP_ID,
            NULL PEDF_NR_NF,
            PEDF_SERIE_NF,
            PEDF_NR_NF_DEV,
            PEDF_SERIE_NF_DEV,
            PEDF_ADC_FIN,
            PEDF_NF_COBERT,
            NULL PEDF_VLR_DESC,
            'Referencia ao Pedido: ' || PEDF_ID_ORIGEM2 || ', Liquidacao: ' || PEDF_LIQU_ID || ', Coleta: ' || (SELECT L.PEDL_NR_LANC FROM PEDIDO_FAT_LOGISTICA L WHERE L.PEDL_LIQU_ID = ORI.PEDF_LIQU_ID AND L.PEDL_EMP_ID = ORI.PEDF_EMP_ID) PEDF_OBS,
            0 PEDF_VLR_DESP,
            0 PEDF_VLR_SEG,
            PEDF_ATU_ESTAT_M,
            PEDF_ATU_ESTAT_D,
            PEDF_ATU_LIVROF,
            PEDF_ATU_COMIS,
            PEDF_SELO,
            PEDF_SERIE_SELO,
            PEDF_SELO_RET,
            NULL PEDF_VLR_DESC_BOLETO,
            PEDF_LIB_ANALISTA,
            PEDF_DIAS_CARENCIA,
            PEDF_RET_CARGA,
            PEDF_BOLETO,
            PEDF_TIPO_PED,
            PEDF_REL_EXP_CARGA,
            0 PEDF_PESO_BRUTO_TOTAL,
            PEDF_QTD_CAIXA_TOTAL,
            PEDF_CLIEP_PLACA,
            PEDF_CLIEP_CLI_ID,
            PEDF_CLIEP_CLI_EMP_ID,
            PEDF_CONF_WMS,
            PEDF_FRETE_COMBINADO,
            0 PEDF_COMISSAO,
            PEDF_PRINCIPAL,
            PEDF_TP_VENCIMENTO,
            PEDF_FAZ_COD_FAZENDA,
            PEDF_FAZ_CLI_ID,
            PEDF_FAZ_CLI_EMP_ID,
            PEDF_FAZ_EMP_ID,
            PEDF_LIQU_EMP_ID_LIQUIDACAO_OR,
            PEDF_LIQU_ID_LIQUIDACAO_ORIGEM,
            PEDF_NR_ORCA,
            PEDF_DTA_EMIS,
            PEDF_EMPENHO,
            PEDF_ATU_CTA_GRAF,
            PEDF_ORIGEM,
            PEDF_ORIGEM_NUMERO,
            PEDF_ATU_CONTAB,
            PEDF_PECON_EMP_ID,
            PEDF_PECON_ID,
            PEDF_FRO_ID,
            PEDF_FRO_EMP_ID,
            PEDF_PRE_PEDIDO,
            PEDF_PCON_EMP_ID,
            PEDF_PCON_ID,
            PEDF_ATU_ESTAT_E,
            PEDF_ATUALIZA_CONSIG,
            PEDF_DTA_VCTO_CONSIG,
            PEDF_COB_ID,
            PEDF_COB_EMP_ID,
            PEDF_CLI_ANT_ID,
            PEDF_CLI_ANT_EMP_ID,
            PEDF_AGENDAMENTO,
            PEDF_AGD_EMP_ID,
            PEDF_AGD_ID,
            PEDF_AGD_DATA,
            PEDF_FROT_EMP_ID_RDESP,
            PEDF_FROT_ID_RDESP,
            PEDF_FLAG_FRETE,
            PEDF_FLAG_SEGURO,
            PEDF_FLAG_DESP_ICMS,
            0 PEDF_VLR_BASE_SEG,
            PEDF_FLG_RETIRA,
            PEDF_IMP_LAYOUT,
            PEDF_APROV_REGRAS,
            PEDF_USR_ID_APROV_REGRAS,
            PEDF_DTA_APROV_REGRAS,
            PEDF_EMPR_GEN_ID_DEV,
            PEDF_EMPR_GEN_TGEN_ID_DEV,
            PEDF_EMPR_GEN_EMP_ID_DEV,
            PEDF_EMPR_EMP_ID_DEV,
            PEDF_EMPR_DOCUM_DEV,
            PEDF_EMPR_FLG_BAIXA,
            PEDF_SEQ_RSHOW,
            0 PEDF_VLR_FUNDO_POBREZA,
            PEDF_GEN_EMP_ID_GRP_DESP,
            PEDF_GEN_TGEN_ID_GRP_DESP,
            PEDF_GEN_ID_GRP_DESP,
            0 PEDF_VLR_FRETE_ESP,
            PEDF_EDI_NR_PEDIDO,
            PEDF_EDI_NR_PEDIDO_EMP_ID,
            0 PEDF_ID_ORIGEM,
            PEDF_PEDC_NR_PEDIDO,
            PEDF_ID_DEVOL,
            PEDF_EMP_ID_DEVOL,
            PEDF_VLR_TOT_DESC_ESP_DUPL,
            PEDF_ATU_CTA_GRAF_DEV,
            PEDF_DTA_LIB,
            PEDF_GEN_ID_ROTA_ANT,
            PROF_ALIQ_IPI_DIFERENCIADA,
            0 PEDF_VLR_DESC_ESP_DUPL,
            PEDF_REPLICA_PDF,
            PEDF_GEN_TGEN_ID_MOT_ENTR_DE,
            PEDF_GEN_EMP_ID_MOT_ENTR_DE,
            PEDF_GEN_ID_MOT_ENTR_DE,
            PEDF_FORN_EMP_ID,
            PEDF_IMP_SIMPLE_REM_VAZ,
            PEDF_TP_FRETE,
            PEDF_EXP_CONTAINER,
            PEDF_EXP_SELO,
            PEDF_FATURAMENTO,
            PEDF_NR_PATRIM,
            PEDF_PEDIDO_ANALISADO,
            0 PEDF_VLR_DOT_DESC_ESP_DUPL,
            PEDF_OBS2,
            PEDF_IMP_BASE_ICMS,
            0 PEDF_IMP_VLR_ICMS,
            PEDF_IMP_ALQ_ICMS,
            PEDF_IMP_BASE_PIS,
            0 PEDF_IMP_VLR_PIS,
            PEDF_IMP_ALQ_PIS,
            PEDF_IMP_BASE_COFINS,
            0 PEDF_IMP_VLR_COFINS,
            PEDF_IMP_ALQ_COFINS,
            0 PEDF_IMP_VLR_DI,
            PEDF_IMP_BASE_IPI,
            0 PEDF_IMP_VLR_IPI,
            PEDF_IMP_ALQ_IPI,
            PEDF_IMP_IMPORTACAO,
            PEDF_IMP_BASE_IMPOSTO,
            PEDF_DEV_ACERTO,
            PEDF_ENTR_ID,
            PEDF_ENTR_EMP_ID,
            PEDF_ANALISE_VAL_MIN,
            PEDF_ANALISE_LIBERAR,
            PEDF_ANALISE_ULTIMA_DTA,
            PEDF_FLAG_EBS,
            PEDF_ACERTO_DEV,
            PEDF_ACERTO_DEV_USR_ID,
            PEDF_ACERTO_DEV_DTA,
            PEDF_FLAG_FOX,
            PEDF_RESERVADO_EBS,
            PEDF_INSCRICAO_ESTADUAL,
            PEDF_PESAGEM,
            PEDF_CUPOM_FORTES,
            0 PEDF_VLR_TOT_MOEDA_ORIG,
            0 PEDF_VLR_TOT_SEM_DESC,
            PEDF_ANALISE_PERCENTUAL,
            PEDF_ANALISE_PRECO,
            PEDF_PES_ROTA_EMP_ID,
            PEDF_PES_ROTA_ID,
            PEDF_PES_SETOR_EMP_ID,
            PEDF_PES_SETOR_ID,
            PEDF_PES_USR_ID,
            PEDF_OBS_PES_ROTA,
            PEDF_OBS_PES_SETOR,
            PEDF_OBS_PES_USR,
            PEDF_COMIS_PES_USR,
            PEDF_COMIS_PES_ROTA,
            PEDF_COMIS_PES_SETOR,
            PEDF_OPER_COL_EMP_ID,
            PEDF_OPER_COL_ID,
            PEDF_OPER_COL_DESC,
            PEDF_PES_USR_EMP_ID,
            0 PEDF_VLR_FUNRURAL,
            PEDF_IMPORT,
            PEDF_USR_ID_DEVOLUCAO,
            PEDF_ALOCADO,
            0 PEDF_VLR_DESC_ORIGINAL,
            PEDF_LVR_OPER_BASE_CALC_ICM,
            PEDF_LVR_OPER_ALIQ_ICM_PROD,
            PEDF_LVR_OPER_TIPO_ICMR,
            PEDF_LVR_OPER_TIPO_ICM,
            PEDF_LVR_OPER_TIPO_IPI,
            PEDF_LVR_PARAM_DTA,
            PEDF_VERSAO_CALCULO,
            PEDF_LVR_OPER_TIPO_REDUCAO,
            PEDF_OPER_ALIQ_RED_BC_ICM_OE,
            PEDF_LVR_OPER_DIF_CRED_IPI,
            PEDF_LVR_OPER_DIF_RED_BC_ICM,
            NULL PEDF_PEDL_EMP_ID,
            NULL PEDF_PEDL_NR_LANC,
            PEDF_ACERTO_DEV_ENTR,
            PEDF_EMP_ID_DEV_ENTR,
            PEDF_ID_DEV_ENTR,
            PEDF_GERA_ESTOQUE_DTA_RETORNO,
            PEDF_APROV_CANCNFE,
            PEDF_JUSTIF_APRCANCNFE,
            0 PEDF_VLR_TOT_PED_BKP,
            PEDF_CPF_NFCE,
            NULL PEDF_ID_ORIGEM2,
            PEDF_SERIE_NFCE,
            PEDF_XPED_ID,
            PEDF_ATU_EBS,
            PEDF_CLIENTE_NFCE,
            PEDF_CVTO_EMP_ID_RENEGOCIACAO,
            PEDF_CVTO_ID_RENEGOCIACAO,
            PEDF_DT_EMISSAO_RENEGOCIACAO,
            PEDF_CVTO_EMP_ID_ORIGEM,
            PEDF_CVTO_ID_ORIGEM,
            0 PEDF_VLR_TOT_DES_SUFRAMA,
            0 PEDF_VLR_ICMS_DES,
            PEDF_ALIQ_ICMS_DES,
            PEDF_CLI_IND_IE_DEST,
            0 PEDF_VLR_ICMS_FCP_UF_DEST_TOT,
            0 PEDF_VLR_ICMS_INT_UF_DEST_TOT,
            0 PEDF_VLR_ICMS_INT_UF_REMET_TOT,
            PEDF_CLI_UF_DESTINO,
            PEDF_GEN_ID_ARMZ,
            PEDF_GEN_EMP_ID_ARMZ,
            PEDF_GEN_TGEN_ID_ARMZ,
            PEDF_LIB_COM,
            PEDF_USR_ID_LIB_COM,
            PEDF_DTA_LIB_COM,
            PEDF_MOT_LIB_COM,
            PEDF_LIB_COM_OBS,
            PEDF_GEN_TGEN_ID_MOT_LIB_COM,
            PEDF_GEN_EMP_ID_MOT_LIB_COM,
            PEDF_GEN_ID_MOT_LIB_COM,
            OPEDF_ACERTO_DEV_ENTR,
            PEDF_LIB_ANALISTA_POS,
            PEDF_ID_MANIFESTO,
            PEDF_DTA_AGENDAMENTO,
            PEDF_LIB_VDA_FUT,
            PEDF_USR_ID_VDA_FUT,
            PEDF_DTA_LIB_VDA_FUT,
            0 PEDF_VLR_TOT_BOLETO_CFO,
            PEDF_CONSUMIDOR_FINAL,
            'I' MI_PEDF_ORIGEM
            from pedido_fat ORI where ORI.Pedf_Liqu_Id = :LIQUIDACAO and ORI.pedf_emp_id = :EMPRESA

        )

    ";

    $novo_id_liquidacao ="Select LIQUIDACAO_ID_2_SQ.NEXTVAL as ID FROM DUAL"; 
    $novo_id_pedido_fat ="select pedido_fat_ID_2_SQ.NEXTVAL as ID FROM DUAL"; 
    $apenas_primeiro_prod = "Select * from Pedido_fat_p p where p.pedf_pedf_id = :liquidacao and p.pedf_pedf_emp_id = :empresa and ROWNUM = 1 order by pedf_id";

    $novo_produto = "
            INSERT INTO
            PEDIDO_FAT_P(
                PEDF_PEDF_EMP_ID,
                PEDF_PEDF_ID,
                PEDF_ID,
                PEDF_PROD_EMP_ID,
                PEDF_PROD_ID,
                PEDF_LOTP_EMP_ID,
                PEDF_LOTP_ID,
                PEDF_LOTP_SERIE,
                PEDF_TPRC_DTA_VIGENCIA,
                PEDF_TPRC_EMP_ID,
                PEDF_TPRC_GEN_TGEN_ID,
                PEDF_TPRC_GEN_EMP_ID,
                PEDF_TPRC_GEN_ID,
                PEDF_TPRC_PROD_EMP_ID,
                PEDF_TPRC_PROD_ID,
                PEDF_USR_ID,
                PEDF_VLR_UNIT,
                PEDF_QTDE,
                PEDF_VLR_TOT,
                PEDF_DTA_CAD,
                PEDF_VLR_RED_ICMS,
                PEDF_ALIQ_RED_ICMS,
                PEDF_BASE_ICMS,
                PEDF_VLR_ICMS,
                PEDF_ALIQ_ICMS,
                PEDF_VLR_RED_SUBST,
                PEDF_ALIQ_RED_SUBST,
                PEDF_BASE_IPI,
                PEDF_VLR_IPI,
                PEDF_ALIQ_IPI,
                PEDF_BASE_ICMS_FRETE,
                PEDF_VLR_ICMS_FRETE,
                PEDF_ALIQ_ICMS_FRETE,
                PEDF_VLR_SEGURO,
                PEDF_VLR_ROLHA,
                PEDF_VLR_SELO,
                PEDF_PERC_DESC,
                PEDF_VLR_SUBS,
                PEDF_BASE_SUBS,
                PEDF_ALIQ_SUBS,
                PEDF_QTDE_ORIG,
                PEDF_QTDE_RET,
                PEDF_VLR_FRETE,
                PEDF_ADC_FINANC,
                PEDF_QTD_CAIXA,
                PEDF_VALOR_DESCONTO,
                PEDF_VALOR_FRETE,
                PEDF_VALOR_SEGURO,
                PEDF_LOTE,
                PEDF_DTA_VALIDADE,
                PEDF_CVTO_EMP_ID,
                PEDF_CVTO_ID,
                PEDF_DESC_ATACADO,
                PEDF_VLR_IRRF,
                PEDF_BASE_IRRF,
                PEDF_ALIQ_IRRF,
                PEDF_VLR_ISS,
                PEDF_BASE_ISS,
                PEDF_ALIQ_ISS,
                PEDF_VLR_INSS,
                PEDF_BASE_INSS,
                PEDF_ALIQ_INSS,
                PEDF_CFO,
                PEDF_VALORIZA,
                PEDF_VLR_DIF,
                PEDF_VERIF_ESTOQUE,
                PEDF_SEQ01,
                PEDF_SEQ02,
                PEDF_SEQ03,
                PEDF_SEQ04,
                PEDF_BASE_COFINS,
                PEDF_ALIQ_COFINS,
                PEDF_VLR_COFINS,
                PEDF_BASE_PIS,
                PEDF_ALIQ_PIS,
                PEDF_VLR_PIS,
                PEDF_BASE_CSL,
                PEDF_ALIQ_CSL,
                PEDF_VLR_CSL,
                PEDF_VALOR_DESP,
                PEDF_VLR_TOT_LIQ,
                PEDF_SERIE_1,
                PEDF_SERIE_2,
                PEDF_NR_PATRIM,
                PEDF_PERC_DESC_ORIGINAL,
                PEDF_DESC_PUBLICIDADE,
                PEDF_OUTRAS_DESPESAS,
                PEDF_VLR_UNIT_NFRETE,
                PEDF_VLR_TOTAL_NFRETE,
                PEDF_VLR_UNIT_DCY,
                PEDF_VLR_TOT_DCY,
                PEDF_PERC_COMISS,
                PEDF_VLR_DESC_ESP_DUPL,
                PEDF_UN_AUX,
                PEDF_QTDE_MOEDA,
                PEDC_TROCA_DIF_TAB_9013,
                PEDC_APROV_ROTA,
                PEDC_REGRA_COMODATO,
                PEDC_APROV_COMODATO,
                PEDC_APROV_COMODATO_USR_ID,
                PEDC_APROV_COMODATO_DTA,
                PEDC_REGRA_MINIMO_BOL,
                PEDC_APROV_MINIMO_BOL,
                PEDC_APROV_MINIMO_BOL_USR_ID,
                PEDC_APROV_MINIMO_BOL_DTA,
                PEDC_QTDE_COLET,
                PEDF_CST_PIS_COFINS,
                PEDF_VLR_RAT_FUNDO_POBREZA,
                PEDF_QTD_RET_MANIFESTO_ORI,
                PEDF_PERC_SUG_ROTA,
                PEDF_PERC_SUG_SUPER,
                PEDF_PERC_SUG_USUARIO,
                PEDF_PERC_APR_ROTA,
                PEDF_PERC_APR_SUPER,
                PEDF_PERC_APR_USUARIO,
                PEDF_CST_IPI,
                PEDF_LVR_NBM,
                PEDF_LVR_CFO,
                PEDF_LVR_PROF_REDUCAO_OE,
                PEDF_BASE_ICMS_DES,
                PEDF_VLR_ICMS_DES,
                PEDF_ALIQ_ICMS_DES,
                PEDF_LVR_PROD_UN_VDA,
                PEDF_LVR_ISENTAS,
                PEDF_LVR_OUTRAS,
                PEDF_ICMS_CST,
                PEDF_ALIQ_FUNDO_POBREZ,
                PEDF_ALIQ_FUNDO_POBREZA,
                PEDF_PERC_FCP_UF_DEST,
                PEDF_ALIQ_ICMS_UF_DEST,
                PEDF_PERC_PART_ICMS_INTER,
                PEDF_VLR_ICMS_FCP_UF_DEST,
                PEDF_VLR_ICMS_INT_UF_DEST,
                PEDF_VLR_ICMS_INT_UF_REMET,
                PEDF_PAR_VDA_EMP_ID,
                PEDF_PAR_VDA_PROD_EMP_ID,
                PEDF_PAR_VDA_PROD_ID,
                PEDF_PAR_VDA_TGEN_UF_ID,
                PEDF_PAR_VDA_GEN_UF_EMP_ID,
                PEDF_PAR_VDA_DATA_VIGENCIA,
                PADF_PAR_VDA_GEN_UF_ID,
                PEDF_VLR_FUNDO_POBREZA_ICMS
            )
        --VALUES
        (
        Select 
                PEDF_PEDF_EMP_ID, -- :empresa
                :novo_id PEDF_PEDF_ID, -- id anterior do pedido novo referente a número do pedido fat id
                :count PEDF_ID,
                PEDF_PROD_EMP_ID,
                :produto PEDF_PROD_ID, -- id do produtos
                PEDF_LOTP_EMP_ID,
                PEDF_LOTP_ID,
                PEDF_LOTP_SERIE,
                (select MAX(T.TPRC_DTA_VIGENCIA) AS VIGENCIA 
                    from tab_preco t 
                    where t.tprc_prod_id = :produto
                    and t.tprc_emp_id = p.pedf_pedf_emp_id
                    AND T.TPRC_GEN_ID = 

                    (SELECT
                        MI_TAB_PRECO
                        FROM
                            MI_PARAM_PROD_PEDIDO_AUT MI
                            INNER JOIN OPERACAO_FAT F ON F.OPER_ID = MI.MI_OPER_FAT_ID
                            AND F.OPER_EMP_ID = MI.MI_EMP_ID
                            LEFT JOIN OPERACAO_EST E ON E.OPER_ID = F.OPER_OPER_E_ID
                        WHERE
                            MI_OPER_FAT_ID_REF = (select fd.pedf_oper_id from pedido_fat fd where fd.pedf_id = p.pedf_pedf_id and fd.pedf_emp_id = p.pedf_pedf_emp_id)
                        AND MI_PROD_ID = :produto
                        AND MI.MI_EMP_ID = p.pedf_pedf_emp_id)
                AND T.TPRC_DTA_VALIDADE >= SYSDATE) PEDF_TPRC_DTA_VIGENCIA,
                (SELECT
                    MI_TAB_EMP_ID
                    FROM
                        MI_PARAM_PROD_PEDIDO_AUT MI
                        INNER JOIN OPERACAO_FAT F ON F.OPER_ID = MI.MI_OPER_FAT_ID
                        AND F.OPER_EMP_ID = MI.MI_EMP_ID
                        LEFT JOIN OPERACAO_EST E ON E.OPER_ID = F.OPER_OPER_E_ID
                    WHERE
                        MI_OPER_FAT_ID_REF = (select fd.pedf_oper_id from pedido_fat fd where fd.pedf_id = p.pedf_pedf_id and fd.pedf_emp_id = p.pedf_pedf_emp_id) AND MI_PROD_ID = 52 AND MI.MI_EMP_ID = p.pedf_pedf_emp_id) PEDF_TPRC_EMP_ID, -- empresa
                PEDF_TPRC_GEN_TGEN_ID,
                PEDF_TPRC_GEN_EMP_ID,
                (SELECT
                    MI_TAB_PRECO
                    FROM
                        MI_PARAM_PROD_PEDIDO_AUT MI
                        INNER JOIN OPERACAO_FAT F ON F.OPER_ID = MI.MI_OPER_FAT_ID
                        AND F.OPER_EMP_ID = MI.MI_EMP_ID
                        LEFT JOIN OPERACAO_EST E ON E.OPER_ID = F.OPER_OPER_E_ID
                    WHERE
                        MI_OPER_FAT_ID_REF = (select fd.pedf_oper_id from pedido_fat fd where fd.pedf_id = p.pedf_pedf_id and fd.pedf_emp_id = p.pedf_pedf_emp_id) AND MI_PROD_ID = 52 AND MI.MI_EMP_ID = p.pedf_pedf_emp_id) PEDF_TPRC_GEN_ID,
                PEDF_TPRC_PROD_EMP_ID,
                :produto PEDF_TPRC_PROD_ID, -- id do produtos
                PEDF_USR_ID,
                0 PEDF_VLR_UNIT,
                :qtd PEDF_QTDE,
                0 PEDF_VLR_TOT,
                PEDF_DTA_CAD,
                0 PEDF_VLR_RED_ICMS,
                PEDF_ALIQ_RED_ICMS,
                0 PEDF_BASE_ICMS,
                0 PEDF_VLR_ICMS,
                0 PEDF_ALIQ_ICMS,
                0 PEDF_VLR_RED_SUBST,
                PEDF_ALIQ_RED_SUBST,
                0 PEDF_BASE_IPI,
                0 PEDF_VLR_IPI,
                0 PEDF_ALIQ_IPI,
                PEDF_BASE_ICMS_FRETE,
                0 PEDF_VLR_ICMS_FRETE,
                PEDF_ALIQ_ICMS_FRETE,
                0 PEDF_VLR_SEGURO,
                0 PEDF_VLR_ROLHA,
                0 PEDF_VLR_SELO,
                PEDF_PERC_DESC,
                0 PEDF_VLR_SUBS,
                PEDF_BASE_SUBS,
                0 PEDF_ALIQ_SUBS,
                PEDF_QTDE_ORIG,
                PEDF_QTDE_RET,
                0 PEDF_VLR_FRETE,
                PEDF_ADC_FINANC,
                PEDF_QTD_CAIXA,
                PEDF_VALOR_DESCONTO,
                PEDF_VALOR_FRETE,
                PEDF_VALOR_SEGURO,
                PEDF_LOTE,
                PEDF_DTA_VALIDADE,
                PEDF_CVTO_EMP_ID,
                PEDF_CVTO_ID,
                PEDF_DESC_ATACADO,
                0 PEDF_VLR_IRRF,
                PEDF_BASE_IRRF,
                PEDF_ALIQ_IRRF,
                0 PEDF_VLR_ISS,
                PEDF_BASE_ISS,
                PEDF_ALIQ_ISS,
                0 PEDF_VLR_INSS,
                PEDF_BASE_INSS,
                PEDF_ALIQ_INSS,
                PEDF_CFO,
                PEDF_VALORIZA,
                0 PEDF_VLR_DIF,
                PEDF_VERIF_ESTOQUE,
                PEDF_SEQ01,
                PEDF_SEQ02,
                PEDF_SEQ03,
                PEDF_SEQ04,
                0 PEDF_BASE_COFINS,
                0 PEDF_ALIQ_COFINS,
                0 PEDF_VLR_COFINS,
                0 PEDF_BASE_PIS,
                0 PEDF_ALIQ_PIS,
                0 PEDF_VLR_PIS,
                PEDF_BASE_CSL,
                PEDF_ALIQ_CSL,
                0 PEDF_VLR_CSL,
                PEDF_VALOR_DESP,
                0 PEDF_VLR_TOT_LIQ,
                PEDF_SERIE_1,
                PEDF_SERIE_2,
                PEDF_NR_PATRIM,
                PEDF_PERC_DESC_ORIGINAL,
                PEDF_DESC_PUBLICIDADE,
                PEDF_OUTRAS_DESPESAS,
                0 PEDF_VLR_UNIT_NFRETE,
                0 PEDF_VLR_TOTAL_NFRETE,
                0 PEDF_VLR_UNIT_DCY,
                0 PEDF_VLR_TOT_DCY,
                PEDF_PERC_COMISS,
                0 PEDF_VLR_DESC_ESP_DUPL,
                PEDF_UN_AUX,
                PEDF_QTDE_MOEDA,
                PEDC_TROCA_DIF_TAB_9013,
                PEDC_APROV_ROTA,
                PEDC_REGRA_COMODATO,
                PEDC_APROV_COMODATO,
                PEDC_APROV_COMODATO_USR_ID,
                PEDC_APROV_COMODATO_DTA,
                PEDC_REGRA_MINIMO_BOL,
                PEDC_APROV_MINIMO_BOL,
                PEDC_APROV_MINIMO_BOL_USR_ID,
                PEDC_APROV_MINIMO_BOL_DTA,
                PEDC_QTDE_COLET,
                49 PEDF_CST_PIS_COFINS,
                0 PEDF_VLR_RAT_FUNDO_POBREZA,
                PEDF_QTD_RET_MANIFESTO_ORI,
                PEDF_PERC_SUG_ROTA,
                PEDF_PERC_SUG_SUPER,
                PEDF_PERC_SUG_USUARIO,
                PEDF_PERC_APR_ROTA,
                PEDF_PERC_APR_SUPER,
                PEDF_PERC_APR_USUARIO,
                99 PEDF_CST_IPI,
                (select fis.PROF_GEN_ID from produto_fis fis where fis.prof_prod_id = :produto and fis.prof_prod_emp_id = :empresa) PEDF_LVR_NBM,
                (select oper.OPER_GEN_ID_COD_FISCAL_DE from operacao_fat oper where oper.oper_emp_id = :empresa and oper.oper_id = (select pd.pedf_oper_id from pedido_fat pd where pd.pedf_id = :novo_id and pd.pedf_emp_id = :empresa)) PEDF_LVR_CFO,
                PEDF_LVR_PROF_REDUCAO_OE,
                PEDF_BASE_ICMS_DES,
                0 PEDF_VLR_ICMS_DES,
                PEDF_ALIQ_ICMS_DES,
                PEDF_LVR_PROD_UN_VDA,
                PEDF_LVR_ISENTAS,
                PEDF_LVR_OUTRAS,
                40 PEDF_ICMS_CST,
                PEDF_ALIQ_FUNDO_POBREZ,
                PEDF_ALIQ_FUNDO_POBREZA,
                PEDF_PERC_FCP_UF_DEST,
                PEDF_ALIQ_ICMS_UF_DEST,
                PEDF_PERC_PART_ICMS_INTER,
                0 PEDF_VLR_ICMS_FCP_UF_DEST,
                0 PEDF_VLR_ICMS_INT_UF_DEST,
                0 PEDF_VLR_ICMS_INT_UF_REMET,
                PEDF_PAR_VDA_EMP_ID,
                PEDF_PAR_VDA_PROD_EMP_ID,
                PEDF_PAR_VDA_PROD_ID,
                PEDF_PAR_VDA_TGEN_UF_ID,
                PEDF_PAR_VDA_GEN_UF_EMP_ID,
                PEDF_PAR_VDA_DATA_VIGENCIA,
                PADF_PAR_VDA_GEN_UF_ID,
                0 PEDF_VLR_FUNDO_POBREZA_ICMS       
        from Pedido_fat_p p where p.pedf_pedf_id = (select fd.pedf_id from pedido_fat fd where fd.pedf_liqu_id = :liquidacao and fd.pedf_emp_id = p.pedf_pedf_emp_id and fd.pedf_emp_id = p.pedf_pedf_emp_id and fd.pedf_id not in :novo_id and ROWNUM = 1) and p.pedf_pedf_emp_id = :empresa and ROWNUM = 1 --order by pedf_id
            )                                           
    ";

    $delete_reserva = "
        DELETE FROM 
        RESERVA_ESTOQUE R
        WHERE R.RES_LIQUIDACAO = :liquidacao
        AND R.RES_EMP_ID = :empresa
    ";
    
    $insert_reserva = "
        INSERT INTO
        RESERVA_ESTOQUE (
            RES_DATA,
            RES_LIQUIDACAO,
            RES_EMP_ID,
            RES_PROD_COD,
            RES_QTDE
        )
        VALUES
        (
            SYSDATE,
            :liquidacao,
            :empresa,
            :prod_id,
            :qtd_coleta
        )  
    ";

    $set_data_lib = "
        UPDATE
        LIQUIDACAO L
        SET
        L.LIQU_DTA_LIB = SYSDATE,
        L.LIQU_DTA_LIB_ANT = SYSDATE,
        L.LIQU_DTA_SAI = SYSDATE
        WHERE
        L.LIQU_ID = :liquidacao
        AND L.LIQU_EMP_ID = :empresa    
    ";

    $clear_data_lib = "
        UPDATE
        LIQUIDACAO L
        SET
        L.LIQU_DTA_LIB = NULL,
        L.LIQU_DTA_LIB_ANT = SYSDATE,
        L.LIQU_DTA_SAI = SYSDATE
        WHERE
        L.LIQU_ID = :liquidacao
        AND L.LIQU_EMP_ID = :empresa    
    ";

    $get_liquidacoes = "
            SELECT
            DISTINCT T.PEDF_PEDL_NR_LANC AS COLETA,
            T.PEDF_LIQU_ID AS LIQUIDACAO,
            DECODE(L.LIQU_FRETE_C_F, 'C', 'CIF', 'FOB') FRETE,
            L.LIQU_NOME_TRANSP AS TRANSPORTADOR,
            L.LIQU_PLACA_TRANSP PLACA,
            LG.PEDL_NOME_MOTORISTA AS MOTORISTA,
            SUM(PP.PEDF_QTDE) AS CXS,
            SUM(T.PEDF_PESO_BRUTO_TOTAL) PESO,
            LG.PEDL_DTA_COLETA AS DATA_COLETA,
            LG.PEDL_DTA_AGEND_CLI AS DATA_ENTREGA,
            LG.PEDL_FRO_ID AS COD_TRANSP,
            DECODE(
                LG.PEDL_TIPO_CARGA,
                0,
                'PALETIZADA',
                1,
                'BATIDA',
                2,
                'CHEP',
                3,
                'FRACIONADA',
                LG.PEDL_TIPO_CARGA
            ) AS TIPO,
            LG.PEDL_VLR_FRETE_CONT AS VALOR,
            DECODE(T.PEDF_FLAG_EMIS, 9, 'B', 'L') STATUS
            /*(SELECT DISTINCT RP_STATUS AS STATUS 
            FROM MI_RASTREIO_PEDIDO 
            WHERE ROWNUM = 1 
            AND RP_NR_LANC = T.PEDF_PEDL_NR_LANC) AS STATUS*/
        FROM
            MA_PEDIDO_FAT F
            LEFT JOIN VIEW_CLIENTE_ENDERECO CE ON CE.CLI_ID = F.PEDF_CLI_ID
            AND CE.EMP_ID = F.PEDF_CLI_EMP_ID
            LEFT JOIN PEDIDO_FAT T ON T.PEDF_ID_ORIGEM2 = F.PEDF_ID
            AND T.PEDF_EMP_ID = F.PEDF_EMP_ID
            INNER JOIN LIQUIDACAO L ON L.LIQU_ID = T.PEDF_LIQU_ID
            AND L.LIQU_EMP_ID = T.PEDF_LIQU_EMP_ID
            INNER JOIN PEDIDO_FAT_P PP ON PP.PEDF_PEDF_ID = T.PEDF_ID
            AND PP.PEDF_PEDF_EMP_ID = T.PEDF_EMP_ID
            LEFT JOIN PEDIDO_FAT_LOGISTICA LG ON LG.PEDL_LIQU_ID = L.LIQU_ID
            AND LG.PEDL_LIQU_EMP_ID = L.LIQU_EMP_ID
        WHERE
            F.PEDF_SITUACAO IN (4)
            AND T.PEDF_LIQU_ID <> 1
            AND NVL(T.PEDF_LIB_ANALISTA, 'N') = 'S'
            AND T.PEDF_NR_NF IS NULL
            AND F.PEDF_DTA_CAD >= '01/06/2018'
            AND T.PEDF_PEDL_NR_LANC IS NOT NULL
            /*AND T.PEDF_PEDL_NR_LANC IN 
            (SELECT DISTINCT MI.PEDIDO_MA FROM MI_PEDIDOS_MA_APTOS MI) */
            AND LG.PEDL_RASTREAMENTO_FINALIZADO = 'N' /*   AND (SELECT DISTINCT RP_STATUS AS STATUS 
                                                FROM MI_RASTREIO_PEDIDO 
                                                WHERE ROWNUM = 1 
                                                    AND RP_NR_LANC = T.PEDF_PEDL_NR_LANC) IN ('B', 'L')*/ 
                                        GROUP BY T.PEDF_PEDL_NR_LANC, 
                                                T.PEDF_LIQU_ID, 
                                                L.LIQU_FRETE_C_F, 
                                                L.LIQU_NOME_TRANSP, 
                                                L.LIQU_PLACA_TRANSP, 
                                                LG.PEDL_NOME_MOTORISTA, 
                                                LG.PEDL_DTA_COLETA, 
                                                LG.PEDL_DTA_AGEND_CLI, 
                                                LG.PEDL_FRO_ID, 
                                                LG.PEDL_TIPO_CARGA, 
                                                LG.PEDL_VLR_FRETE_CONT, 
                                                T.PEDF_FLAG_EMIS 
                                        
        UNION
        ALL SELECT COLETA, 
                                                LIQUIDACAO, 
                                                FRETE, 
                                                TRANSPORTADOR, 
                                                PLACA, 
                                                MOTORISTA, 
                                                VOLUME_TOTAL, 
                                                PESO_TOTAL, 
                                                DTA_COLETA, 
                                                DTA_AGENDA, 
                                                COD_FROTA, 
                                                TIPO, 
                                                VALOR, 
                                                STATUS 
                                                /*(SELECT DISTINCT RP_STATUS AS STATUS 
                                                FROM MI_RASTREIO_PEDIDO 
                                                WHERE ROWNUM = 1 
                                                    AND RP_NR_LANC = VMI.COLETA) AS STATUS*/ 
                                        FROM VIEW_MI_COLETAS_EXTRAS VMI 
                                        
        /* WHERE (SELECT DISTINCT RP_STATUS AS STATUS 
        FROM MI_RASTREIO_PEDIDO 
        WHERE ROWNUM = 1 
        AND RP_NR_LANC = VMI.COLETA) IN ('B', 'L') 
        ORDER BY DATA_COLETA DESC*/
        ORDER BY STATUS DESC
    ";


    $verificar_estoque = "
            SELECT  
            PROD.PROD_ID ID, 
            PROD.PROD_DESC DESCRICAO, 
            nvl(( SELECT SUM(PP.PEDF_QTDE) 
                FROM PEDIDO_FAT F, 
                    PEDIDO_FAT_P PP, 
                    PRODUTO PR 
                WHERE F.PEDF_PEDL_NR_LANC = :coleta
                AND PP.PEDF_PEDF_ID     = F.PEDF_ID 
                AND PR.PROD_ID          = PROD.PROD_ID 
                AND PR.PROD_EMP_ID      = 2
                AND PP.PEDF_PROD_ID     = PROD.PROD_ID 
                GROUP BY  
                PP.PEDF_PROD_ID ),0) COLETA, 
        nvl((SELECT  
            SUM(D.MOVE_QTDE) 
            FROM MOV_ESTOQUE_D D, OPERACAO_EST O 
            WHERE D.MOVE_MOVE_OPER_E_ID = O.OPER_ID 
            AND O.OPER_INC_PROD         = '+' 
            AND D.MOVE_PROD_ID          = PROD.PROD_ID 
            AND D.MOVE_MOVE_EMP_ID      = 2
            AND D.MOVE_MOVE_DATA        >= '01/02/2021'),0) 
        - 
        nvl((SELECT  
            SUM(D.MOVE_QTDE) 
            FROM MOV_ESTOQUE_D D, OPERACAO_EST O 
            WHERE D.MOVE_MOVE_OPER_E_ID = O.OPER_ID 
            AND O.OPER_INC_PROD         = '-' 
            AND D.MOVE_PROD_ID          = PROD.PROD_ID 
            AND D.MOVE_MOVE_EMP_ID      = 2
            AND D.MOVE_MOVE_DATA        >= '01/02/2021'),0) ESTOQUE, 
            
        NVL((SELECT 
            SUM(T.RES_QTDE)  
            FROM RESERVA_ESTOQUE T 
            WHERE T.RES_PROD_COD = PROD.PROD_ID 
            AND T.RES_EMP_ID   = 2), 0) RESERVA, 
        nvl((SELECT  
        SUM(D.MOVE_QTDE) 
        FROM MOV_ESTOQUE_D D, OPERACAO_EST O 
        WHERE D.MOVE_MOVE_OPER_E_ID = O.OPER_ID 
        AND O.OPER_INC_PROD         = '+' 
        AND D.MOVE_PROD_ID          = PROD.PROD_ID 
        AND D.MOVE_MOVE_EMP_ID      = 2
        AND D.MOVE_MOVE_DATA        >= '01/02/2021'),0) 
        - 
        nvl((SELECT  
        SUM(D.MOVE_QTDE) 
        FROM MOV_ESTOQUE_D D, OPERACAO_EST O 
        WHERE D.MOVE_MOVE_OPER_E_ID = O.OPER_ID 
        AND O.OPER_INC_PROD         = '-' 
        AND D.MOVE_PROD_ID          = PROD.PROD_ID 
        AND D.MOVE_MOVE_EMP_ID      = 2
        AND D.MOVE_MOVE_DATA        >= '01/02/2021'),0) 
        - NVL((SELECT 
            SUM(T.RES_QTDE)  
            FROM RESERVA_ESTOQUE T 
        WHERE T.RES_PROD_COD = PROD.PROD_ID 
            AND T.RES_EMP_ID   = 2), 0)  
        - nvl(( SELECT SUM(PP.PEDF_QTDE) 
            FROM PEDIDO_FAT F, 
                PEDIDO_FAT_P PP, 
                PRODUTO PR 
            WHERE F.PEDF_PEDL_NR_LANC = :coleta
            AND PP.PEDF_PEDF_ID     = F.PEDF_ID 
            AND PR.PROD_ID          = PROD.PROD_ID 
            AND PR.PROD_EMP_ID      = 2
            AND PP.PEDF_PROD_ID     = PROD.PROD_ID 
            GROUP BY  
            PP.PEDF_PROD_ID ),0) DIFERENCA                   
        FROM PEDIDO_FAT P  
        ,PEDIDO_FAT_P PP 
        ,PRODUTO PROD 
        ,MOV_ESTOQUE_D ED 
        WHERE P.PEDF_PEDL_NR_LANC = :coleta     
            AND PP.PEDF_PEDF_EMP_ID = P.PEDF_EMP_ID 
            AND PP.PEDF_PEDF_ID     = P.PEDF_ID 
            AND PP.PEDF_PROD_EMP_ID = PROD.PROD_EMP_ID 
            AND PP.PEDF_PROD_ID     = PROD.PROD_ID 
        
        GROUP BY PROD.PROD_ID 
                ,PROD.PROD_DESC 
                
        ORDER BY PROD.PROD_ID   
    ";


?>