import glob, sys, numpy as np
from PIL import Image
def lum(a):
    a=a/255.0; a=np.where(a<=0.04045,a/12.92,((a+0.055)/1.055)**2.4)
    return 0.2126*a[...,0]+0.7152*a[...,1]+0.0722*a[...,2]
def block(L,k=8):
    h,w=L.shape; return L[:h//k*k,:w//k*k].reshape(h//k,k,w//k,k).mean((1,3))
MUTED=lum(np.array([[0x5C,0x60,0x5E]],float))[0]
def contrast(pattern, cols=None):
    worst=99; worstcols=None
    for f in sorted(glob.glob(pattern)):
        L=block(lum(np.asarray(Image.open(f).convert('RGB')).astype(float)))
        c=(L+0.05)/(MUTED+0.05); worst=min(worst,c.min())
        colmin=c.min(0); worstcols=colmin if worstcols is None else np.minimum(worstcols,colmin)
    return worst, worstcols
if __name__=='__main__':
    w,cols=contrast(sys.argv[1]); n=len(cols)
    print('whole frame min', round(w,2), '| by tenth of width:', [round(cols[int(n*i/10):int(n*(i+1)/10)].min(),2) for i in range(10)])
