import java.io.*;
import java.util.*;

public class CodeSprint {

    static int n;
    static int a[];
    static ArrayList<Integer> g[];
    static long st[], total;
    static HashMap<Long, Integer> cnt;
    static HashMap<Long, Integer> pcnt;
    static long ans;

    public static void main(String[] args) {
        InputReader in = new InputReader(System.in);
        PrintWriter w = new PrintWriter(System.out);

        int q = in.nextInt();

        while (q-- > 0) {
            n = in.nextInt();

            a = in.nextIntArray(n);

            g = new ArrayList[n];
            for (int i = 0; i < n; i++)
                g[i] = new ArrayList<Integer>();

            for (int i = 1; i < n; i++) {
                int u = in.nextInt() - 1;
                int v = in.nextInt() - 1;
                g[u].add(v);
                g[v].add(u);
            }

            st = new long[n];
            cnt = new HashMap<Long, Integer>();
            pcnt = new HashMap<Long, Integer>();
            dfs(0, -1);
            total = st[0];
            rem(st[0]);
            
            ans = Long.MAX_VALUE;

            for (int i = 1; i < n; i++) {
                if (st[i] == total - st[i]) {
                    ans = Math.min(ans, st[i]);
                }
            }
            
            for (long entry : cnt.keySet()) {
                if (cnt.get(entry) >= 2) {
                    long rem = total - 2 * entry;
                    if (rem <= entry) {
                        ans = Math.min(ans, entry - rem);
                    }
                }
            }

            
            dfs2(0, -1);

            w.println(ans == Long.MAX_VALUE ? -1 : ans);
        }

        w.close();
    }

    static void dfs(int c, int p) {
        st[c] = a[c];
        for (int d : g[c]) {
            if (d != p) {
                dfs(d, c);
                st[c] += st[d];
            }
        }
        add(st[c]);
    }

    static void dfs2(int c, int p) {
        if (c != 0) {
            rem(st[c]);
            
            long needed = total - st[c];
            if (needed % 2 == 0) {
                needed /= 2;
                if (needed >= st[c]) {
                    if (cnt.containsKey(needed))
                        ans = Math.min(ans, needed - st[c]);
                }
            }
            
            long parentValue = st[c];
            if (pcnt.containsKey(parentValue + st[c])) {
                long left = total - 2 * st[c];
                if (left <= st[c])
                    ans = Math.min(ans, st[c] - left);
            }
            parentValue = (total - st[c]) / 2;
            if (parentValue >= st[c] && 2 * parentValue + st[c] == total) {
                if (pcnt.containsKey(parentValue + st[c]))
                    ans = Math.min(ans, parentValue - st[c]);
            }
            
            parentValue = total - 2 * st[c];
            if (parentValue <= st[c] && pcnt.containsKey(parentValue + st[c])) {
                ans = Math.min(ans, st[c] - parentValue);
            }
            
            padd(st[c]);
        }

        
        for (int d : g[c]) {
            if (d != p) {
                dfs2(d, c);
            }
        }

        if (c != 0) {
            prem(st[c]);
            add(st[c]);
        }
    }

    static void add(long m) {
        if (!cnt.containsKey(m))
            cnt.put(m, 0);
        cnt.put(m, cnt.get(m) + 1);
    }

    static void rem(long m) {
        cnt.put(m, cnt.get(m) - 1);
        if (cnt.get(m) == 0)
            cnt.remove(m);
    }

    static void padd(long m) {
        if (!pcnt.containsKey(m))
            pcnt.put(m, 0);
        pcnt.put(m, pcnt.get(m) + 1);
    }

    static void prem(long m) {
        pcnt.put(m, pcnt.get(m) - 1);
        if (pcnt.get(m) == 0)
            pcnt.remove(m);
    }

    static class InputReader {

        private final InputStream stream;
        private final byte[] buf = new byte[8192];
        private int curChar, snumChars;
        private SpaceCharFilter filter;

        public InputReader(InputStream stream) {
            this.stream = stream;
        }

        public int snext() {
            if (snumChars == -1)
                throw new InputMismatchException();
            if (curChar >= snumChars) {
                curChar = 0;
                try {
                    snumChars = stream.read(buf);
                } catch (IOException e) {
                    throw new InputMismatchException();
                }
                if (snumChars <= 0)
                    return -1;
            }
            return buf[curChar++];
        }

        public int nextInt() {
            int c = snext();
            while (isSpaceChar(c)) {
                c = snext();
            }
            int sgn = 1;
            if (c == '-') {
                sgn = -1;
                c = snext();
            }
            int res = 0;
            do {
                if (c < '0' || c > '9')
                    throw new InputMismatchException();
                res *= 10;
                res += c - '0';
                c = snext();
            } while (!isSpaceChar(c));
            return res * sgn;
        }

        public long nextLong() {
            int c = snext();
            while (isSpaceChar(c)) {
                c = snext();
            }
            int sgn = 1;
            if (c == '-') {
                sgn = -1;
                c = snext();
            }
            long res = 0;
            do {
                if (c < '0' || c > '9')
                    throw new InputMismatchException();
                res *= 10;
                res += c - '0';
                c = snext();
            } while (!isSpaceChar(c));
            return res * sgn;
        }

        public int[] nextIntArray(int n) {
            int a[] = new int[n];
            for (int i = 0; i < n; i++) {
                a[i] = nextInt();
            }
            return a;
        }

        public String readString() {
            int c = snext();
            while (isSpaceChar(c)) {
                c = snext();
            }
            StringBuilder res = new StringBuilder();
            do {
                res.appendCodePoint(c);
                c = snext();
            } while (!isSpaceChar(c));
            return res.toString();
        }

        public boolean isSpaceChar(int c) {
            if (filter != null)
                return filter.isSpaceChar(c);
            return c == ' ' || c == '\n' || c == '\r' || c == '\t' || c == -1;
        }

        public interface SpaceCharFilter {
            public boolean isSpaceChar(int ch);
        }
    }
}