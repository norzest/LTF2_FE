// writer : 심영효
import styled from 'styled-components'


export const CartAlertImg = styled.div`
    content: "";
    width: 56px;
    height: 56px;
    background: url(https://image.lguplus.com/static/pc-static/common/images/indv-biz/base/sprites-common.svg) -650px 0 no-repeat;
`

export const CartImgLayout = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 40px;
`

export const CartLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction : column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    border: 0;
    background: #fff;
`;

export const CartText = styled.p`
    margin: 0;
    color: #000;
    font-weight: 400;
    font-size : 24px;
`

export const MvMainBtnLayout = styled.div`
    margin-top: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
`

export const CartNoticeDl = styled.dl`
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding: 32px;
    text-align: left;
    position: relative;
    background-color: #f8f8f8;
    border-radius: 14px;
`

export const CartNoticeImg = styled.div`
    content: "";
    overflow: hidden;
    width: 22px;
    height: 22px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto 0;
`

export const CartNoticeDt = styled.dt`
    font-weight: 100;
    font-size: 16px;
    color: #666;
    margin-bottom: 10px!important;
    position: relative;
    padding-left: 28px;
`

export const CartNoticeLi = styled.li`
    padding-left: 8px;
    position: relative;
    font-size: 14px;
    color: #666;
`

export const CartTabMenuUl = styled.ul`
    display: flex;
    margin-bottom: 32px;
    padding-top: 8px;
    padding-left: 0;
    padding: 0 27px;
`

export const CartProductTbl = styled.div`
    border: 1px solid #ddd;
    border-radius: 14px;
`

export const CartProductTblTitle = styled.div`
    display: flex;
    align-items: center;
    height: 68px;
    padding: 0 24px;
    border-radius: 14px 14px 0 0;
    background: #f5f5f5;
`

export const CartProductEm = styled.em`
    font-size: 16px;
    color: #666;
    margin: 0;
    padding: 0;
    font-style: normal;
    vertical-align: baseline;
`

export const CartProductContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: 32px 64px;
`

export const CartProductContainerPThumb = styled.div`
    overflow: hidden;
    width: 120px;
    height: 120px;
    margin-right: 16px;
    margin-top: 6px;
    border-radius: 8px;
`

export const CartProductContainerPThumbImg = styled.img`
    width: auto;
    max-width: 120px;
    max-height: 120px;
    min-width: 100px;
`

export const CartProductContainerPProduct = styled.div`
    flex: 1;
    margin: 0;
    margin-right: 16px;
    padding: 0;
    border: 0;
    word-break: break-word;
    text-align: left;
`

export const CartProductContainerPProductData = styled.p`
    margin: 0;
    padding: 0;    
    font-size: 14px;
    font-weight: 400;
`

export const CartProductContainerPProductTit = styled.p`
    margin: 0;
    padding: 0; 
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 400;
`

export const CartProductContainerPProductDesc = styled.p`
    margin: 0;
    padding: 0; 
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: 400;
`

export const OptionItemSpan = styled.p`
    margin: 0;
    padding: 0; 
    display: inline-block;
    color: #000;
    white-space: nowrap;
`

export const OptionItemLine = styled.div`
    content: "";
    display: inline-block;
    width: 1px;
    height: 16px;
    margin: 0 8px;
    background: #bbb;
`

export const PDetailGroup = styled.div`
    display: flex;
    align-items: center;
    padding-top: 32px;
    letter-spacing: -1px;
    margin: 0;
    padding: 0;
    border: 0;
    word-break: break-word;
`

export const PDetailGroupItemInfo = styled.span`
    display: block;
    position: relative;
    padding: 0 32px;
`

export const PDetailGroupItemInfoDiv = styled.div`
    margin: 0px;
    border: 0px;
    display: block;
    position: relative;
    padding: 0 32px;
`

export const PDetailGroupItemInfoLine = styled.div`
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    display: block;
    width: 1px;
    height: 56px;
    margin: auto 0;
    background: #ddd;
`

export const PDetailProductPrice = styled.p`
    margin: 0px;
    position: relative;
    font-size: 30px;
    font-weight: 700;
`

export const IsBlind = styled.span`
    overflow: hidden;
    border: 0;
    position: absolute;
    width: 1px;
    height: 1px;
    clip: rect(1px,1px,1px,1px);
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
`

export const COverflowMenu = styled.ul`
    display:  ${(props) => (props.over ? 
        "block"
        :
        "none"
        )};
    position: absolute;
    min-width: 127px;
    top: 48px;
    margin-top: -3px;
    padding: 0 10px;
    border-radius: 12px;
    box-shadow: 2px 3px 20px rgb(0 0 0 / 12%);
    background: #fff;
    z-index: 2;
`

export const COverflowMenuLi = styled.li`
    list-style: none;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
`

export const COverflowMenua = styled.a`
    text-decoration: none;
    display: block;
    color: #666;
    text-align: center;
`

export const ProductContainerBtnDel = styled.button`
    display: block;
    position: absolute;
    top: 19px;
    right: 19px;
    width: 16px;
    height: 16px;
    background: url(https://image.lguplus.com/static/pc-static/common/images/indv-biz/base/sprites-common.svg) no-repeat;
    background-position: -550px -210px;
    border-width: 0px;
    cursor: pointer;
`