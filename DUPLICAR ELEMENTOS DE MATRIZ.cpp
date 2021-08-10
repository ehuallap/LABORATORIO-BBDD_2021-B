#include <iostream>
using namespace std;

void duplicarElemMatriz(int matriz[3][3][3], int n, int l, int z){
    for(int i=0;i<n;++i){
        for(int j=0;j<l;++j){
            for(int k=0;k<z;++k)
                *(*(*(matriz+i)+j)+k)*=2;
        }
        cout << endl;
    }
}
void mostrar (int matriz[3][3][3], int n, int l, int z){
    for(int i=0;i<n;++i){
        for(int j=0;j<l;++j){
            for(int k=0;k<z;++k)
                cout << *(*(*(matriz+i)+j)+k) << " ";
            cout << endl;
        }
        cout << endl;
    }
}
int main()
{
    int x[3][3][3] = {{{1,2,3},{4,5,6},{7,8,9}},
                     {{11,12,13},{14,15,16},{17,18,19}},
                     {{21,22,23},{24,25,26},{27,28,29}},
                     };
    cout << "ELEMENTOS DE LA MATRIZ SIN DUPLICAR: " << endl;
    mostrar(x,3,3,3);
    cout << "DUPLICANDO ELEMENTOS DE LA MATRIZ... " << endl;
    duplicarElemMatriz(x,3,3,3);
    cout << "ELEMENTOS DUPLICADOS: " << endl;
    mostrar(x,3,3,3);
    return 0;
}
