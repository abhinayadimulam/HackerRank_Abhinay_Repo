
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.InputMismatchException;

public class E4 {
    InputStream is;
    PrintWriter out;
    String INPUT = "";
    int p(int k)
    {
        return k == 0 ? 0 : 1<<k-1;
    }
    
    boolean equals(char[] a, char[] b, int lim)
    {
        for(int i = 0;i <= lim;i++){
            if(a[i] != b[i])return false;
        }
        return true;
    }
    boolean plus1(char[] a, char[] b, int lim)
    {
        boolean zero = false;
        for(int i = lim;i >= 0;i--){
            if(zero){
                if(a[i] != b[i])return false;
            }else{
                if(b[i]-a[i] == 1){
                    zero = true;
                }else if(b[i] == '0' && a[i] == '9'){
                    
                }else{
                    return false;
                }
            }
        }
        return true;
    }
    
    public static char[] minus1(char[] a)
    {
        if(a.length == 1 && a[0] == '0')throw new RuntimeException();
        for(int i = a.length-1;i >= 0;i--){
            if(--a[i] < '0'){
                a[i] = '9';
            }else{
                break;
            }
        }
        if(a[0] == '0'){
            return Arrays.copyOfRange(a, 1, a.length);
        }else{
            return a;
        }
    }
    
    String toss(char[] o)
    {
        StringBuilder sb = new StringBuilder();
        boolean ok = false;
        for(char c : o){
            if(c != '0'){
                ok = true;
            }
            if(ok){
                sb.append(c);
            }
        }
        if(sb.length() == 0)sb.append('0');
        return sb.toString();
    }
    
    String toss(char[] o, int l, int r)
    {
        StringBuilder sb = new StringBuilder();
        boolean ok = false;
        for(int i = l;i < r;i++){
            char c = o[i];
            if(c != '0'){
                ok = true;
            }
            if(ok){
                sb.append(c);
            }
        }
        if(sb.length() == 0)sb.append('0');
        return sb.toString();
    }
    
    void solve()
    {
        char[] ZL = minus1(ns().toCharArray());
        char[] R = ns().toCharArray();
        int n = R.length;
        char[] L = new char[n];
        Arrays.fill(L, '0');
        for(int i = 0;i < ZL.length;i++){
            L[L.length-i-1] = ZL[ZL.length-i-1];
        }
        
        String[] bis = new String[100];
        int[] ks = new int[100];
        int p = 0;
        for(int m = 21;m >= 0;m--){
            if(L.length <= p(m))continue;
            if(equals(L, R, L.length-p(m))){
                continue;
            }
            
            for(int k = 0;k < m;k++){
                if(!iszero(L, L.length-p(k+1), L.length-p(k))){
                    char[] o = new char[p(k+1)-p(k)+1];
                    o[0] = '0';
                    for(int i = L.length-p(k+1), j = 1;i < L.length-p(k);i++,j++){
                        o[j] = (char)('9'-(L[i]-'0'));
                    }
                    for(int i = o.length-1;i >= 0;i--){
                        o[i]++;
                        if(o[i] > '9'){
                            o[i] = '0';
                        }else{
                            break;
                        }
                    }
                    ks[p] = k; bis[p] = toss(o); p++;
                    for(int i = L.length-p(k+1);i < L.length-p(k);i++){
                        L[i] = '0';
                    }
                    for(int i = L.length-p(k+1)-1;i >= 0;i--){
                        L[i]++;
                        if(L[i] > '9'){
                            L[i] = '0';
                        }else{
                            break;
                        }
                    }
                }
            }
            
            char[] minus = new char[R.length-p(m)];
            for(int i = 0;i < R.length-p(m);i++){
                minus[i] = (char)(R[i]-L[i]+'0');
            }
            for(int i = R.length-p(m)-1;i >= 0;i--){
                if(minus[i] < '0'){
                    minus[i] += 10;
                    minus[i-1]--;
                }
            }

            String tos = toss(minus);
            if(!tos.equals("0")){
                ks[p] = m; bis[p] = tos; p++;
            }
            
            for(int k = m-1;k >= 0;k--){
                if(!iszero(R, R.length-p(k+1), R.length-p(k))){
                    if(p-1 >= 0 && ks[p-1] == k){
                        BigInteger M = new BigInteger(new String(R, R.length-p(k+1), p(k+1)-p(k)));
                        bis[p-1] = new BigInteger(bis[p-1]).add(M).toString();
                    }else{
                        ks[p] = k; bis[p] = toss(R, R.length-p(k+1), R.length-p(k)); p++;
                    }
                }
            }
            
            break;
        }
        
        out.println(p);
        for(int i = 0;i < p;i++){
            out.println(ks[i] + " " + bis[i]);
        }
    }
    
    boolean iszero(char[] a, int f, int t)
    {
        for(int i = f;i < t;i++){
            if(a[i] != '0')return false;
        }
        return true;
    }
    
    void run() throws Exception
    {

        is = INPUT.isEmpty() ? System.in : new ByteArrayInputStream(INPUT.getBytes());
        out = new PrintWriter(System.out);
        
        long s = System.currentTimeMillis();
        solve();
        out.flush();
        if(!INPUT.isEmpty())tr(System.currentTimeMillis()-s+"ms");
    }
    
    public static void main(String[] args) throws Exception { new E4().run(); }
    
    private byte[] inbuf = new byte[1024];
    private int lenbuf = 0, ptrbuf = 0;
    
    private int readByte()
    {
        if(lenbuf == -1)throw new InputMismatchException();
        if(ptrbuf >= lenbuf){
            ptrbuf = 0;
            try { lenbuf = is.read(inbuf); } catch (IOException e) { throw new InputMismatchException(); }
            if(lenbuf <= 0)return -1;
        }
        return inbuf[ptrbuf++];
    }
    
    private boolean isSpaceChar(int c) { return !(c >= 33 && c <= 126); }
    private int skip() { int b; while((b = readByte()) != -1 && isSpaceChar(b)); return b; }
    
    private double nd() { return Double.parseDouble(ns()); }
    private char nc() { return (char)skip(); }
    
    private String ns()
    {
        int b = skip();
        StringBuilder sb = new StringBuilder();
        while(!(isSpaceChar(b))){ // when nextLine, (isSpaceChar(b) && b != ' ')
            sb.appendCodePoint(b);
            b = readByte();
        }
        return sb.toString();
    }
    
    private char[] ns(int n)
    {
        char[] buf = new char[n];
        int b = skip(), p = 0;
        while(p < n && !(isSpaceChar(b))){
            buf[p++] = (char)b;
            b = readByte();
        }
        return n == p ? buf : Arrays.copyOf(buf, p);
    }
    
    private char[][] nm(int n, int m)
    {
        char[][] map = new char[n][];
        for(int i = 0;i < n;i++)map[i] = ns(m);
        return map;
    }
    
    private int[] na(int n)
    {
        int[] a = new int[n];
        for(int i = 0;i < n;i++)a[i] = ni();
        return a;
    }
    
    private int ni()
    {
        int num = 0, b;
        boolean minus = false;
        while((b = readByte()) != -1 && !((b >= '0' && b <= '9') || b == '-'));
        if(b == '-'){
            minus = true;
            b = readByte();
        }
        
        while(true){
            if(b >= '0' && b <= '9'){
                num = num * 10 + (b - '0');
            }else{
                return minus ? -num : num;
            }
            b = readByte();
        }
    }
    
    private long nl()
    {
        long num = 0;
        int b;
        boolean minus = false;
        while((b = readByte()) != -1 && !((b >= '0' && b <= '9') || b == '-'));
        if(b == '-'){
            minus = true;
            b = readByte();
        }
        
        while(true){
            if(b >= '0' && b <= '9'){
                num = num * 10 + (b - '0');
            }else{
                return minus ? -num : num;
            }
            b = readByte();
        }
    }
    
    private static void tr(Object... o) { System.out.println(Arrays.deepToString(o)); }
}
