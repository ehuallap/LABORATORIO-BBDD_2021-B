from connection.connection_pool import MySQLPool

class ModelModelos:
    def __init__(self):
        self.mysql_pool = MySQLPool()

    def create_modelo(self, nombre, precio, descripcion):
        params = {
            'nombre': nombre,
            'precio': precio,
            'descripcion': descripcion,
        }
        # Reemplazar por procedimiento almacenado
        query = """INSERT INTO modelos (nombre_modelo, precio_modelo, descripcion_modelo) VALUES (%(nombre)s, %(precio)s, %(descripcion)s)"""
        cursor = self.mysql_pool.execute(query, params, commit=True)
        data = {'id': cursor.lastrowid, 'nombre': nombre, 'descripcion': descripcion}
        return data

    def get_modelos(self):
        rv = self.mysql_pool.execute("""SELECT * FROM modelos""")
        data = []
        content = {}
        for result in rv:
            content = {'id': result[0], 'nombre': result[1], 'descripcion': result[2]}
            data.append(content)
            content = {}
        return data

    def delete_modelo(self, modelo_id):
        params = {'id': modelo_id}
        query = """DELETE FROM modelos WHERE id_modelo = %(id)s"""
        self.mysql_pool.execute(query, params, commit=True)
        data = {'result': 'success'}
        return data


if __name__ == "__main__":
    tm = ModelModelos()
    print(tm.get_modelos())
