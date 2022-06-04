#include <iostream>
#include <bits/stdc++.h>
using namespace std;


int main(){
    long long n = 776;
    long long r = 116;
    long long fact[n+1] = {1};
    for(long long i=1;i<n+1;i++){
            fact[i] = (fact[i-1] * i) % 1000000007; 
        }
    // for(long long i=0;i<n+1;i++){
    //     cout<<i<<' '<<fact[i]<<endl;
    // }
    cout<<fact[r]<<' '<<fact[n];
    cout<<fact[n] / (fact[r]*fact[n-r]);
    return 0;
}
