<?php
    // SQL
    include_once "liberacao_faturamento.php";
    // Conexão com banco de dados
    include_once "../../../src/conexao.php";

    // Início gerar pedido pallets e chapatex
    if($_POST['action'] == 'gerar_pedido') {
        if(isset($_POST['liquidacao']) > 0){

            $conectar->beginTransaction(); // Solicitar para fazer commit somente no final dos sqls
            try {
                //  print_r($_POST);

                $liquidacao = $_POST['liquidacao'];
                $pallets = $_POST['pallets'];
                $chapatex = $_POST['chapatex'];

                // echo $liquidacao;
                // echo $pallets;
                // echo $chapatex;

                // print_r($_POST);

                // $sql = "UPDATE PEDIDO_FAT T SET  T.PEDF_FLAG_EMIS = 0 WHERE T.PEDF_EMP_ID = 2 AND T.PEDF_LIQU_ID = ?";
                $stmt= $conectar->prepare($novo_id_pedido_fat);
                $stmt->execute();
                $novo_id = $stmt->fetchColumn();
                
                // echo $novo_id;

                if($novo_id > 0){
                    $consulta= $conectar->prepare($gerar_pedido);
                    $consulta->bindValue(':LIQUIDACAO', $liquidacao, PDO::PARAM_INT);
                    $consulta->bindValue(':PEDF_ID_NOVO', $novo_id, PDO::PARAM_INT);
                    $consulta->bindValue(':EMPRESA', 2, PDO::PARAM_INT);
                    $consulta->execute();  
                    // print_r($consulta);   
                    $updateCount = $stmt->rowCount();
                    // print_r($updateCount);   

                    $conectar->commit();
                    $count = 1;
                        if($pallets > 0){
                            try {
                                $count ++;
                                $conectar->beginTransaction();
                                $consulta = $conectar->prepare($novo_produto);
                                $consulta->bindValue(':liquidacao', $liquidacao, PDO::PARAM_INT);
                                $consulta->bindValue(':novo_id', $novo_id, PDO::PARAM_INT);
                                $consulta->bindValue(':count', 1, PDO::PARAM_INT);
                                $consulta->bindValue(':qtd', $pallets, PDO::PARAM_INT);
                                $consulta->bindValue(':produto', 52, PDO::PARAM_INT);
                                $consulta->bindValue(':empresa', 2, PDO::PARAM_INT);
                                $consulta->execute();  
                                $conectar->commit();

                            } catch (PDOException $e) {
                                echo json_encode(array ('status'=>false,'message'=>$e->getMessage()));
                                $conectar->rollBack();
                            }
                        }

                        if($chapatex > 0){
                            try {
                                $conectar->beginTransaction();
                                $consulta = $conectar->prepare($novo_produto);
                                $consulta->bindValue(':liquidacao', $liquidacao, PDO::PARAM_INT);
                                $consulta->bindValue(':novo_id', $novo_id, PDO::PARAM_INT);
                                $consulta->bindValue(':count', $count, PDO::PARAM_INT);
                                $consulta->bindValue(':qtd', $chapatex, PDO::PARAM_INT);
                                $consulta->bindValue(':produto', 51, PDO::PARAM_INT);
                                $consulta->bindValue(':empresa', 2, PDO::PARAM_INT);
                                $consulta->execute();  
                                $conectar->commit();
                                
                            } catch (PDOException $e) {
                                echo json_encode(array ('status'=>false,'message'=>$e->getMessage()));
                                $conectar->rollBack();
                            }
                        } 

                        // $conectar->beginTransaction();
                        // $stmt = $conectar->prepare(`BEGIN "CALCULO_PEDIDO_F$P" ( EMP_ATIVA => :empresa, LIQU_ID => :liquidacao, PEDIDO_ID => :novo_id, COD_USUARIO => 1, SITUACAO => 0,  GERA_NF => '0', ERROS => :out ); END;`);
                        // $value = '';
                        // $stmt->bindValue(':liquidacao', $liquidacao, PDO::PARAM_INT);
                        // $stmt->bindValue(':novo_id', $novo_id, PDO::PARAM_INT);
                        // $stmt->bindValue(':empresa', 2, PDO::PARAM_INT);
                        // $stmt->bindValue(':out', $value, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 4000); 
                        
                        // call the stored procedure
                        // $stmt->execute();

                        // $conectar->beginTransaction();
                        // $consulta = $conectar->prepare(`BEGIN "CALCULO_PEDIDO_F$P" ( EMP_ATIVA => :empresa, LIQU_ID => :liquidacao, PEDIDO_ID => :novo_id, COD_USUARIO => 1, SITUACAO => 0,  GERA_NF => '0', ERROS => null ); END`);
                        // $consulta->bindValue(':liquidacao', $liquidacao, PDO::PARAM_INT);
                        // $consulta->bindValue(':novo_id', $novo_id, PDO::PARAM_INT);
                        // $consulta->bindValue(':empresa', 2, PDO::PARAM_INT);
                        // $consulta->execute();  
                        // $conectar->commit(); 

                        echo json_encode(array ('status'=>true, 'pedido'=>$novo_id));
                }else{
                    $conectar->rollBack();
                }
            } catch (PDOException $e) {

                $conectar->rollBack();

                $conectar->beginTransaction();
                $consulta = $conectar->prepare('delete from Pedido_Fat t where t.pedf_id = :novo_id and t.pedf_emp_id = :empresa');
                $consulta->bindValue(':novo_id', $novo_id, PDO::PARAM_INT);
                $consulta->bindValue(':empresa', 2, PDO::PARAM_INT);
                $consulta->execute();  
                $conectar->commit();

                echo json_encode(array ('status'=>false,'message'=>$e->getMessage()));
            }
        }
    }
    // Fim gerar pedido pallets e chapatex

 // Início Liberar Faturamento
 if($_POST['action'] == 'lib_fat') {
    if(isset($_POST['liquidacao']) > 0){

        $conectar->beginTransaction(); // Solicitar para fazer commit somente no final dos sqls
        try {
            //  print_r($_POST);

            $liquidacao = $_POST['liquidacao'];

            $obj = json_decode($_POST['produtos']);

            foreach((array) $obj as $x => $value) {
                $prod_id = $value->prod_id;
                $qtd_coleta = $value->qtd_coleta;

                $consulta= $conectar->prepare($insert_reserva);
                $consulta->bindValue(':liquidacao', $liquidacao, PDO::PARAM_INT);
                $consulta->bindValue(':empresa', 2, PDO::PARAM_INT);
                $consulta->bindValue(':prod_id', $prod_id, PDO::PARAM_INT);
                $consulta->bindValue(':qtd_coleta', $qtd_coleta, PDO::PARAM_INT);
                $consulta->execute();            
                $updateCount = $consulta->rowCount();
            }

            $sql = "UPDATE PEDIDO_FAT T SET  T.PEDF_FLAG_EMIS = 0 WHERE T.PEDF_EMP_ID = 2 AND T.PEDF_LIQU_ID = ?";
            $stmt= $conectar->prepare($sql);
            $stmt->execute([$liquidacao]);
            $updateCount = $stmt->rowCount();

            if($updateCount > 0){
                $consulta= $conectar->prepare($set_data_lib);
                $consulta->bindValue(':liquidacao', $liquidacao, PDO::PARAM_INT);
                $consulta->bindValue(':empresa', 2, PDO::PARAM_INT);
                $consulta->execute();            
                $updateCount = $stmt->rowCount();
                $conectar->commit();
                echo json_encode(array ('status'=>true));
            }else{
                $conectar->rollBack();
            }
        } catch (PDOException $e) {
            echo json_encode(array ('status'=>false,'message'=>$e->getMessage()));
            $conectar->rollBack();
        }
    }
}
// Fim Liberar Faturamento    

    // Início Cancelar Faturamento
    if($_POST['action'] == 'can_fat') {
        if(isset($_POST['liquidacao']) > 0){
            $conectar->beginTransaction(); // Solicitar para fazer commit somente no final dos sqls
            try{    
                $liquidacao = $_POST['liquidacao'];

                $sql = "UPDATE PEDIDO_FAT T SET  T.PEDF_FLAG_EMIS = 9 WHERE T.PEDF_EMP_ID = 2 AND t.pedf_nr_nf IS NULL AND T.PEDF_LIQU_ID = ?";
                $stmt= $conectar->prepare($sql);
                $stmt->execute([$liquidacao]);
                $updateCount = $stmt->rowCount();

                if($updateCount > 0){
                    $consulta= $conectar->prepare($clear_data_lib);
                    $consulta->bindValue(':liquidacao', $liquidacao, PDO::PARAM_INT);
                    $consulta->bindValue(':empresa', 2, PDO::PARAM_INT);
                    $consulta->execute();            
                    $updateCount = $stmt->rowCount();

                    if($updateCount > 0){
                        $consulta= $conectar->prepare($delete_reserva);
                        $consulta->bindValue(':liquidacao', $liquidacao, PDO::PARAM_INT);
                        $consulta->bindValue(':empresa', 2, PDO::PARAM_INT);
                        $consulta->execute();            
                        
                        $consulta = $conectar->prepare('delete from Pedido_Fat t where t.pedf_liqu_id = :liquidacao and t.pedf_oper_id in (258,259) and t.pedf_emp_id = :empresa');
                        $consulta->bindValue(':liquidacao', $liquidacao, PDO::PARAM_INT);
                        $consulta->bindValue(':empresa', 2, PDO::PARAM_INT);
                        $consulta->execute();  
        
                        $conectar->commit();
                        echo json_encode(array ('status'=>true));
                    }else{
                        echo json_encode(array ('status'=>false));
                        $conectar->rollBack();
                    }            
                }else{
                    echo json_encode(array ('status'=>false,'message'=>'Pedido já contém número de nota!'));
                    $conectar->rollBack();
                }
            } catch (PDOException $e) {
                echo json_encode(array ('status'=>false,'message'=>$e->getMessage()));
                $conectar->rollBack();
            }
        }    
    }
    // Fim Cancelar Faturamento

    // Início Preencher dados tabela
    if($_POST['action'] == 'get_all') {
        
        $conectar->beginTransaction(); // Solicitar para fazer commit somente no final dos sqls
        try {
            $consulta = $conectar->query($get_liquidacoes);
            $results = $consulta->fetchAll(PDO::FETCH_ASSOC);
            $json = json_encode($results);
            $conectar->commit();
            echo $json;
        } catch (PDOException $e) {
            echo json_encode(array ('status'=>false,'message'=>$e->getMessage()));
            $conectar->rollBack();
        }
    }
    // Fim Preencher dados tabela

    // Início Verificar Estoque
    if($_POST['action'] == 'verificar_estoque') {
        if(isset($_POST['coleta']) > 0){
            $coleta = $_POST['coleta'];
            $conectar->beginTransaction(); // Solicitar para fazer commit somente no final dos sqls
            try {
                $consulta = $conectar->prepare($verificar_estoque);
                $consulta->bindValue(':coleta', $coleta, PDO::PARAM_INT);
                $consulta->execute();
                $results = $consulta->fetchAll(PDO::FETCH_ASSOC);
                $json = json_encode($results);
                $conectar->commit();
                echo $json;
            } catch (PDOException $e) {
                echo json_encode(array ('status'=>false,'message'=>$e->getMessage()));
                $conectar->rollBack();
            }
        }
    }
    // Fim Verificar Estoque

?>