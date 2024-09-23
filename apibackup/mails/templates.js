require('dotenv').config();

module.exports = {
  signupComplete(token, user) {
    return `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <!-- NAME: 1 COLUMN -->
        <!--[if gte mso 15]>
        <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>*|MC:SUBJECT|*</title>

    <style type="text/css">
		p{
			margin:10px 0;
			padding:0;
		}
		table{
			border-collapse:collapse;
		}
		h1,h2,h3,h4,h5,h6{
			display:block;
			margin:0;
			padding:0;
		}
		img,a img{
			border:0;
			height:auto;
			outline:none;
			text-decoration:none;
		}
		body,#bodyTable,#bodyCell{
			height:100%;
			margin:0;
			padding:0;
			width:100%;
		}
		.mcnPreviewText{
			display:none !important;
		}
		#outlook a{
			padding:0;
		}
		img{
			-ms-interpolation-mode:bicubic;
		}
		table{
			mso-table-lspace:0pt;
			mso-table-rspace:0pt;
		}
		.ReadMsgBody{
			width:100%;
		}
		.ExternalClass{
			width:100%;
		}
		p,a,li,td,blockquote{
			mso-line-height-rule:exactly;
		}
		a[href^=tel],a[href^=sms]{
			color:inherit;
			cursor:default;
			text-decoration:none;
		}
		p,a,li,td,body,table,blockquote{
			-ms-text-size-adjust:100%;
			-webkit-text-size-adjust:100%;
		}
		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
			line-height:100%;
		}
		a[x-apple-data-detectors]{
			color:inherit !important;
			text-decoration:none !important;
			font-size:inherit !important;
			font-family:inherit !important;
			font-weight:inherit !important;
			line-height:inherit !important;
		}
		#bodyCell{
			padding:10px;
		}
		.templateContainer{
			max-width:600px !important;
			border-collapse: collapse;
	        border-radius: 16px;
	    	border-style: hidden !important;
    		box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
		}

		a.mcnButton{
			display:block;
		}
		.mcnImage,.mcnRetinaImage{
			vertical-align:bottom;
		}
		.mcnTextContent{
			word-break:break-word;
		}
		.mcnTextContent img{
			height:auto !important;
		}
		.mcnDividerBlock{
			table-layout:fixed !important;
		}
	/*
	@tab Page
	@section Background Style
	@tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
	*/
		body,#bodyTable{
			/*@editable*/background-color:#FAFAFA;
		}
	/*
	@tab Page
	@section Background Style
	@tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
	*/
		#bodyCell{
			/*@editable*/border-top:0;
		}
	/*
	@tab Page
	@section Email Border
	@tip Set the border for your email.
	*/
		.templateContainer{
			/*@editable*/border:0;
			box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
		}
	/*
	@tab Page
	@section Heading 1
	@tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
	@style heading 1
	*/
		h1{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:26px;
			/*@editable*/font-style:normal;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:125%;
			/*@editable*/letter-spacing:normal;
			/*@editable*/text-align:left;
		}
	/*
	@tab Page
	@section Heading 2
	@tip Set the styling for all second-level headings in your emails.
	@style heading 2
	*/
		h2{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:22px;
			/*@editable*/font-style:normal;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:125%;
			/*@editable*/letter-spacing:normal;
			/*@editable*/text-align:left;
		}
	/*
	@tab Page
	@section Heading 3
	@tip Set the styling for all third-level headings in your emails.
	@style heading 3
	*/
		h3{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:20px;
			/*@editable*/font-style:normal;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:125%;
			/*@editable*/letter-spacing:normal;
			/*@editable*/text-align:left;
		}
	/*
	@tab Page
	@section Heading 4
	@tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
	@style heading 4
	*/
		h4{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:18px;
			/*@editable*/font-style:normal;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:125%;
			/*@editable*/letter-spacing:normal;
			/*@editable*/text-align:left;
		}
	/*
	@tab Preheader
	@section Preheader Style
	@tip Set the background color and borders for your email's preheader area.
	*/
		#templatePreheader{
			/*@editable*/background-color:#FAFAFA;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:0;
			/*@editable*/padding-top:9px;
			/*@editable*/padding-bottom:9px;
		}
	/*
	@tab Preheader
	@section Preheader Text
	@tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
	*/
		#templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
			/*@editable*/color:#656565;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:12px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Preheader
	@section Preheader Link
	@tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
	*/
		#templatePreheader .mcnTextContent a,#templatePreheader .mcnTextContent p a{
			/*@editable*/color:#656565;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	/*
	@tab Header
	@section Header Style
	@tip Set the background color and borders for your email's header area.
	*/
		#templateHeader{
			background-color: initial;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:0;
			/*@editable*/padding-top:9px;
			/*@editable*/padding-bottom:0;
		}
	/*
	@tab Header
	@section Header Text
	@tip Set the styling for your email's header text. Choose a size and color that is easy to read.
	*/
		#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:16px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Header
	@section Header Link
	@tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
	*/
		#templateHeader .mcnTextContent a,#templateHeader .mcnTextContent p a{
			/*@editable*/color:#007C89;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	/*
	@tab Body
	@section Body Style
	@tip Set the background color and borders for your email's body area.
	*/
		#templateBody{
			background-color: initial !important;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:2px solid #EAEAEA;
			/*@editable*/padding-top:0;
			/*@editable*/padding-bottom:0;
		}
	/*
	@tab Body
	@section Body Text
	@tip Set the styling for your email's body text. Choose a size and color that is easy to read.
	*/
		#templateBody .mcnTextContent,#templateBody .mcnTextContent p{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:16px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Body
	@section Body Link
	@tip Set the styling for your email's body links. Choose a color that helps them stand out from your text.
	*/
		#templateBody .mcnTextContent a,#templateBody .mcnTextContent p a{
			/*@editable*/color:#007C89;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	/*
	@tab Footer
	@section Footer Style
	@tip Set the background color and borders for your email's footer area.
	*/
		#templateFooter{
			/*@editable*/background-color:#FAFAFA;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:0;
			/*@editable*/padding-top:9px;
			/*@editable*/padding-bottom:9px;
		}
	/*
	@tab Footer
	@section Footer Text
	@tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
	*/
		#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
			/*@editable*/color:#656565;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:12px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:center;
		}
	/*
	@tab Footer
	@section Footer Link
	@tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
	*/
		#templateFooter .mcnTextContent a,#templateFooter .mcnTextContent p a{
			/*@editable*/color:#656565;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	@media only screen and (min-width:768px){
		.templateContainer{
			width:600px !important;
		}

}	@media only screen and (max-width: 480px){
		body,table,td,p,a,li,blockquote{
			-webkit-text-size-adjust:none !important;
		}

}	@media only screen and (max-width: 480px){
		body{
			width:100% !important;
			min-width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnRetinaImage{
			max-width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImage{
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
			max-width:100% !important;
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnBoxedTextContentContainer{
			min-width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageGroupContent{
			padding:9px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
			padding-top:9px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
			padding-top:18px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageCardBottomImageContent{
			padding-bottom:9px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageGroupBlockInner{
			padding-top:0 !important;
			padding-bottom:0 !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageGroupBlockOuter{
			padding-top:9px !important;
			padding-bottom:9px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnTextContent,.mcnBoxedTextContentColumn{
			padding-right:18px !important;
			padding-left:18px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
			padding-right:18px !important;
			padding-bottom:0 !important;
			padding-left:18px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcpreview-image-uploader{
			display:none !important;
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 1
	@tip Make the first-level headings larger in size for better readability on small screens.
	*/
		h1{
			/*@editable*/font-size:22px !important;
			/*@editable*/line-height:125% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 2
	@tip Make the second-level headings larger in size for better readability on small screens.
	*/
		h2{
			/*@editable*/font-size:20px !important;
			/*@editable*/line-height:125% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 3
	@tip Make the third-level headings larger in size for better readability on small screens.
	*/
		h3{
			/*@editable*/font-size:18px !important;
			/*@editable*/line-height:125% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 4
	@tip Make the fourth-level headings larger in size for better readability on small screens.
	*/
		h4{
			/*@editable*/font-size:16px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Boxed Text
	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
	*/
		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
			/*@editable*/font-size:14px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Preheader Visibility
	@tip Set the visibility of the email's preheader on small screens. You can hide it to save space.
	*/
		#templatePreheader{
			/*@editable*/display:block !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Preheader Text
	@tip Make the preheader text larger in size for better readability on small screens.
	*/
		#templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
			/*@editable*/font-size:14px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Header Text
	@tip Make the header text larger in size for better readability on small screens.
	*/
		#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
			/*@editable*/font-size:16px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Body Text
	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
	*/
		#templateBody .mcnTextContent,#templateBody .mcnTextContent p{
			/*@editable*/font-size:16px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Footer Text
	@tip Make the footer content text larger in size for better readability on small screens.
	*/
		#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
			/*@editable*/font-size:14px !important;
			/*@editable*/line-height:150% !important;
		}

}</style></head>
    <body>
        <center>
            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                <tr>
                    <td align="center" valign="top" id="bodyCell">
                        <!-- BEGIN TEMPLATE // -->
                        <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                        <tr>
                        <td align="center" valign="top" width="600" style="width:600px;">
                        <![endif]-->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="max-width: 600px !important;">

                            <tr>
                                <td valign="top" id="templateHeader"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
    <tbody class="mcnImageBlockOuter">
            <tr>
                <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                        <tbody><tr>
                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">


                                        <img align="center" alt="" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/cb932210-f8ff-ef26-fe34-0f06df8a8519.png" width="279" style="max-width:279px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage">


                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
    </tbody>
</table></td>
                            </tr>
                            <tr>
                                <td valign="top" id="templateBody"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
    <tbody class="mcnDividerBlockOuter">
        <tr>
            <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
                <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #EAEAEA;">
                    <tbody><tr>
                        <td>
                            <span></span>
                        </td>
                    </tr>
                </tbody></table>
<!--
                <td class="mcnDividerBlockInner" style="padding: 18px;">
                <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
-->
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              	<!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->

				<!--[if mso]>
				<td valign="top" width="600" style="width:600px;">
				<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>

                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

                            <h1 style="text-align: center;"><span style="font-size:14px"><span style="font-family:verdana,geneva,sans-serif"><strong>Hola, ${user}</strong></span></span></h1>

<div style="text-align: center;"><span style="font-size:12px"><span style="font-family:verdana,geneva,sans-serif">Gracias por crear la cuenta en Ventana Menorca</span></span></div>

                        </td>
                    </tr>
                </tbody></table>
				<!--[if mso]>
				</td>
				<![endif]-->

				<!--[if mso]>
				</tr>
				</table>
				<![endif]-->
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock" style="min-width:100%;">
    <!--[if gte mso 9]>
	<table align="center" border="0" cellspacing="0" cellpadding="0" width="100%">
	<![endif]-->
	<tbody class="mcnBoxedTextBlockOuter">
        <tr>
            <td valign="top" class="mcnBoxedTextBlockInner">

				<!--[if gte mso 9]>
				<td align="center" valign="top" ">
				<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;" class="mcnBoxedTextContentContainer">
                    <tbody><tr>

                        <td style="">

                            <table border="0" cellspacing="0" class="mcnTextContentContainer" width="100%" style="min-width: 100% !important;background-color: #ECF9F1;border: 1px none;">
                                <tbody><tr>
                                    <td valign="top" class="mcnTextContent" style="padding: 18px;color: #222222;font-family: Verdana, Geneva, sans-serif;font-size: 12px;font-weight: normal;text-align: center;">
                                        Para completar el registro, por favor haga clic en el<br>
siguiente enlace:


                                    </td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                </tbody></table>
				<!--[if gte mso 9]>
				</td>
				<![endif]-->

				<!--[if gte mso 9]>
                </tr>
                </table>
				<![endif]-->
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock" style="min-width:100%;background-color: #ECF9F1;">
    <tbody class="mcnButtonBlockOuter">
        <tr>
            <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
                <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 35px;background-color: #158C30;padding: 3px 90px;">
                    <tbody>
                        <tr>
                            <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial; font-size: 16px; padding: 18px;">
                                <a href="${process.env.WEB_URL}/completar-registro/${token}" class="mcnButton " title="Confirmar cuenta" href="" target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">Confirmar cuenta</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              	<!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->

				<!--[if mso]>
				<td valign="top" width="600" style="width:600px;">
				<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>

                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

                            <div style="text-align: center;"><span style="font-family:verdana,geneva,sans-serif"><span style="font-size:12px">Atentamente,<br>
Ventana Menorca</span></span></div>

                        </td>
                    </tr>
                </tbody></table>
				<!--[if mso]>
				</td>
				<![endif]-->

				<!--[if mso]>
				</tr>
				</table>
				<![endif]-->
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;background: #F5F5F5;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              	<!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->

				<!--[if mso]>
				<td valign="top" width="300" style="width:300px;">
				<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:300px;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>

                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-left:18px; padding-bottom:9px; padding-right:18px;">

                            <img data-file-id="5913809" height="39" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/a918743d-e512-7d2f-7593-f9de280fb9bc.png" style="border: 0px  ; width: 60px; height: 39px; margin: 0px;" width="60">
                        </td>
                    </tr>
                </tbody></table>
				<!--[if mso]>
				</td>
				<![endif]-->

				<!--[if mso]>
				<td valign="top" width="300" style="width:300px;">
				<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:300px;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>

                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-left:18px; padding-bottom:9px; padding-right:18px;">

                        <div style="float:right;text-align:right;padding: 14px 0 0;">
                          <a href="https://instagram.com/menorcainversiones?igshid=10cetn29cdmvu" target="_blank"><img data-file-id="5913821" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/56759879-13ae-e122-c7cc-65e9c3fe710d.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                          <a href="https://www.facebook.com/menorcalotes" target="_blank"><img data-file-id="5913825" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/48690c0a-d09f-4380-86da-cb88dec0c82d.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                          <a href="https://tiktok.com/@menorcainversiones" target="_blank"><img data-file-id="5913817" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/1eea6d59-7251-f0c6-d657-2a157d2fc52e.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                          <a href="https://pe.linkedin.com/company/menorca-inversiones-s-a-c" target="_blank"><img data-file-id="5913813" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/2346c5ce-2cdd-fa62-7893-7f38700ba837.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>
                        </div>

                        </td>
                    </tr>
                </tbody></table>
				<!--[if mso]>
				</td>
				<![endif]-->

				<!--[if mso]>
				</tr>
				</table>
				<![endif]-->
            </td>
        </tr>
    </tbody>
</table></td>
                            </tr>

                        </table>
                        <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                        <!-- // END TEMPLATE -->
                    </td>
                </tr>
            </table>
        </center>
    <script type="text/javascript"  src="/PxtHz/uB/J/1/CvUJv9EyAQ4/b55fLcDLEwiV/Ay4KP0QVAw/DjxY/PBkpEjE"></script></body>
</html>
`;
  },
  recoverPassword(token, user) {
    return `<!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <!-- NAME: 1 COLUMN -->
        <!--[if gte mso 15]>
        <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>*|MC:SUBJECT|*</title>

    <style type="text/css">
    p{
      margin:10px 0;
      padding:0;
    }
    table{
      border-collapse:collapse;
    }
    h1,h2,h3,h4,h5,h6{
      display:block;
      margin:0;
      padding:0;
    }
    img,a img{
      border:0;
      height:auto;
      outline:none;
      text-decoration:none;
    }
    body,#bodyTable,#bodyCell{
      height:100%;
      margin:0;
      padding:0;
      width:100%;
    }
    .mcnPreviewText{
      display:none !important;
    }
    #outlook a{
      padding:0;
    }
    img{
      -ms-interpolation-mode:bicubic;
    }
    table{
      mso-table-lspace:0pt;
      mso-table-rspace:0pt;
    }
    .ReadMsgBody{
      width:100%;
    }
    .ExternalClass{
      width:100%;
    }
    p,a,li,td,blockquote{
      mso-line-height-rule:exactly;
    }
    a[href^=tel],a[href^=sms]{
      color:inherit;
      cursor:default;
      text-decoration:none;
    }
    p,a,li,td,body,table,blockquote{
      -ms-text-size-adjust:100%;
      -webkit-text-size-adjust:100%;
    }
    .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
      line-height:100%;
    }
    a[x-apple-data-detectors]{
      color:inherit !important;
      text-decoration:none !important;
      font-size:inherit !important;
      font-family:inherit !important;
      font-weight:inherit !important;
      line-height:inherit !important;
    }
    #bodyCell{
      padding:10px;
    }
    .templateContainer{
      max-width:600px !important;
      border-collapse: collapse;
          border-radius: 16px;
        border-style: hidden !important;
        box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
    }

    a.mcnButton{
      display:block;
    }
    .mcnImage,.mcnRetinaImage{
      vertical-align:bottom;
    }
    .mcnTextContent{
      word-break:break-word;
    }
    .mcnTextContent img{
      height:auto !important;
    }
    .mcnDividerBlock{
      table-layout:fixed !important;
    }
    /*
    @tab Page
    @section Background Style
    @tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
    */
    body,#bodyTable{
      /*@editable*/background-color:#FAFAFA;
    }
    /*
    @tab Page
    @section Background Style
    @tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
    */
    #bodyCell{
      /*@editable*/border-top:0;
    }
    /*
    @tab Page
    @section Email Border
    @tip Set the border for your email.
    */
    .templateContainer{
      /*@editable*/border:0;
      box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
    }
    /*
    @tab Page
    @section Heading 1
    @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
    @style heading 1
    */
    h1{
      /*@editable*/color:#202020;
      /*@editable*/font-family:Helvetica;
      /*@editable*/font-size:26px;
      /*@editable*/font-style:normal;
      /*@editable*/font-weight:bold;
      /*@editable*/line-height:125%;
      /*@editable*/letter-spacing:normal;
      /*@editable*/text-align:left;
    }
    /*
    @tab Page
    @section Heading 2
    @tip Set the styling for all second-level headings in your emails.
    @style heading 2
    */
    h2{
      /*@editable*/color:#202020;
      /*@editable*/font-family:Helvetica;
      /*@editable*/font-size:22px;
      /*@editable*/font-style:normal;
      /*@editable*/font-weight:bold;
      /*@editable*/line-height:125%;
      /*@editable*/letter-spacing:normal;
      /*@editable*/text-align:left;
    }
    /*
    @tab Page
    @section Heading 3
    @tip Set the styling for all third-level headings in your emails.
    @style heading 3
    */
    h3{
      /*@editable*/color:#202020;
      /*@editable*/font-family:Helvetica;
      /*@editable*/font-size:20px;
      /*@editable*/font-style:normal;
      /*@editable*/font-weight:bold;
      /*@editable*/line-height:125%;
      /*@editable*/letter-spacing:normal;
      /*@editable*/text-align:left;
    }
    /*
    @tab Page
    @section Heading 4
    @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
    @style heading 4
    */
    h4{
      /*@editable*/color:#202020;
      /*@editable*/font-family:Helvetica;
      /*@editable*/font-size:18px;
      /*@editable*/font-style:normal;
      /*@editable*/font-weight:bold;
      /*@editable*/line-height:125%;
      /*@editable*/letter-spacing:normal;
      /*@editable*/text-align:left;
    }
    /*
    @tab Preheader
    @section Preheader Style
    @tip Set the background color and borders for your email's preheader area.
    */
    #templatePreheader{
      /*@editable*/background-color:#FAFAFA;
      /*@editable*/background-image:none;
      /*@editable*/background-repeat:no-repeat;
      /*@editable*/background-position:center;
      /*@editable*/background-size:cover;
      /*@editable*/border-top:0;
      /*@editable*/border-bottom:0;
      /*@editable*/padding-top:9px;
      /*@editable*/padding-bottom:9px;
    }
    /*
    @tab Preheader
    @section Preheader Text
    @tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
    */
    #templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
      /*@editable*/color:#656565;
      /*@editable*/font-family:Helvetica;
      /*@editable*/font-size:12px;
      /*@editable*/line-height:150%;
      /*@editable*/text-align:left;
    }
    /*
    @tab Preheader
    @section Preheader Link
    @tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
    */
    #templatePreheader .mcnTextContent a,#templatePreheader .mcnTextContent p a{
      /*@editable*/color:#656565;
      /*@editable*/font-weight:normal;
      /*@editable*/text-decoration:underline;
    }
    /*
    @tab Header
    @section Header Style
    @tip Set the background color and borders for your email's header area.
    */
    #templateHeader{
      background-color: initial;
      /*@editable*/background-image:none;
      /*@editable*/background-repeat:no-repeat;
      /*@editable*/background-position:center;
      /*@editable*/background-size:cover;
      /*@editable*/border-top:0;
      /*@editable*/border-bottom:0;
      /*@editable*/padding-top:9px;
      /*@editable*/padding-bottom:0;
    }
    /*
    @tab Header
    @section Header Text
    @tip Set the styling for your email's header text. Choose a size and color that is easy to read.
    */
    #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
      /*@editable*/color:#202020;
      /*@editable*/font-family:Helvetica;
      /*@editable*/font-size:16px;
      /*@editable*/line-height:150%;
      /*@editable*/text-align:left;
    }
    /*
    @tab Header
    @section Header Link
    @tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
    */
    #templateHeader .mcnTextContent a,#templateHeader .mcnTextContent p a{
      /*@editable*/color:#007C89;
      /*@editable*/font-weight:normal;
      /*@editable*/text-decoration:underline;
    }
    /*
    @tab Body
    @section Body Style
    @tip Set the background color and borders for your email's body area.
    */
    #templateBody{
      background-color: initial !important;
      /*@editable*/background-image:none;
      /*@editable*/background-repeat:no-repeat;
      /*@editable*/background-position:center;
      /*@editable*/background-size:cover;
      /*@editable*/border-top:0;
      /*@editable*/border-bottom:2px solid #EAEAEA;
      /*@editable*/padding-top:0;
      /*@editable*/padding-bottom:0;
    }
    /*
    @tab Body
    @section Body Text
    @tip Set the styling for your email's body text. Choose a size and color that is easy to read.
    */
    #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
      /*@editable*/color:#202020;
      /*@editable*/font-family:Helvetica;
      /*@editable*/font-size:16px;
      /*@editable*/line-height:150%;
      /*@editable*/text-align:left;
    }
    /*
    @tab Body
    @section Body Link
    @tip Set the styling for your email's body links. Choose a color that helps them stand out from your text.
    */
    #templateBody .mcnTextContent a,#templateBody .mcnTextContent p a{
      /*@editable*/color:#007C89;
      /*@editable*/font-weight:normal;
      /*@editable*/text-decoration:underline;
    }
    /*
    @tab Footer
    @section Footer Style
    @tip Set the background color and borders for your email's footer area.
    */
    #templateFooter{
      /*@editable*/background-color:#FAFAFA;
      /*@editable*/background-image:none;
      /*@editable*/background-repeat:no-repeat;
      /*@editable*/background-position:center;
      /*@editable*/background-size:cover;
      /*@editable*/border-top:0;
      /*@editable*/border-bottom:0;
      /*@editable*/padding-top:9px;
      /*@editable*/padding-bottom:9px;
    }
    /*
    @tab Footer
    @section Footer Text
    @tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
    */
    #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
      /*@editable*/color:#656565;
      /*@editable*/font-family:Helvetica;
      /*@editable*/font-size:12px;
      /*@editable*/line-height:150%;
      /*@editable*/text-align:center;
    }
    /*
    @tab Footer
    @section Footer Link
    @tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
    */
    #templateFooter .mcnTextContent a,#templateFooter .mcnTextContent p a{
      /*@editable*/color:#656565;
      /*@editable*/font-weight:normal;
      /*@editable*/text-decoration:underline;
    }
    @media only screen and (min-width:768px){
    .templateContainer{
      width:600px !important;
    }

    }	@media only screen and (max-width: 480px){
    body,table,td,p,a,li,blockquote{
      -webkit-text-size-adjust:none !important;
    }

    }	@media only screen and (max-width: 480px){
    body{
      width:100% !important;
      min-width:100% !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnRetinaImage{
      max-width:100% !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnImage{
      width:100% !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
      max-width:100% !important;
      width:100% !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnBoxedTextContentContainer{
      min-width:100% !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnImageGroupContent{
      padding:9px !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
      padding-top:9px !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
      padding-top:18px !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnImageCardBottomImageContent{
      padding-bottom:9px !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnImageGroupBlockInner{
      padding-top:0 !important;
      padding-bottom:0 !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnImageGroupBlockOuter{
      padding-top:9px !important;
      padding-bottom:9px !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnTextContent,.mcnBoxedTextContentColumn{
      padding-right:18px !important;
      padding-left:18px !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
      padding-right:18px !important;
      padding-bottom:0 !important;
      padding-left:18px !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcpreview-image-uploader{
      display:none !important;
      width:100% !important;
    }

    }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Heading 1
    @tip Make the first-level headings larger in size for better readability on small screens.
    */
    h1{
      /*@editable*/font-size:22px !important;
      /*@editable*/line-height:125% !important;
    }

    }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Heading 2
    @tip Make the second-level headings larger in size for better readability on small screens.
    */
    h2{
      /*@editable*/font-size:20px !important;
      /*@editable*/line-height:125% !important;
    }

    }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Heading 3
    @tip Make the third-level headings larger in size for better readability on small screens.
    */
    h3{
      /*@editable*/font-size:18px !important;
      /*@editable*/line-height:125% !important;
    }

    }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Heading 4
    @tip Make the fourth-level headings larger in size for better readability on small screens.
    */
    h4{
      /*@editable*/font-size:16px !important;
      /*@editable*/line-height:150% !important;
    }

    }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Boxed Text
    @tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
    */
    .mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
      /*@editable*/font-size:14px !important;
      /*@editable*/line-height:150% !important;
    }

    }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Preheader Visibility
    @tip Set the visibility of the email's preheader on small screens. You can hide it to save space.
    */
    #templatePreheader{
      /*@editable*/display:block !important;
    }

    }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Preheader Text
    @tip Make the preheader text larger in size for better readability on small screens.
    */
    #templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
      /*@editable*/font-size:14px !important;
      /*@editable*/line-height:150% !important;
    }

    }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Header Text
    @tip Make the header text larger in size for better readability on small screens.
    */
    #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
      /*@editable*/font-size:16px !important;
      /*@editable*/line-height:150% !important;
    }

    }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Body Text
    @tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
    */
    #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
      /*@editable*/font-size:16px !important;
      /*@editable*/line-height:150% !important;
    }

    }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Footer Text
    @tip Make the footer content text larger in size for better readability on small screens.
    */
    #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
      /*@editable*/font-size:14px !important;
      /*@editable*/line-height:150% !important;
    }

    }</style></head>
    <body>
        <center>
            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                <tr>
                    <td align="center" valign="top" id="bodyCell">
                        <!-- BEGIN TEMPLATE // -->
                        <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                        <tr>
                        <td align="center" valign="top" width="600" style="width:600px;">
                        <![endif]-->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="max-width: 600px !important;">

                            <tr>
                                <td valign="top" id="templateHeader"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
    <tbody class="mcnImageBlockOuter">
            <tr>
                <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                        <tbody><tr>
                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">


                                        <img align="center" alt="" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/cb932210-f8ff-ef26-fe34-0f06df8a8519.png" width="279" style="max-width:279px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage">


                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
    </tbody>
    </table></td>
                            </tr>
                            <tr>
                                <td valign="top" id="templateBody"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
    <tbody class="mcnDividerBlockOuter">
        <tr>
            <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
                <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #EAEAEA;">
                    <tbody><tr>
                        <td>
                            <span></span>
                        </td>
                    </tr>
                </tbody></table>
    <!--
                <td class="mcnDividerBlockInner" style="padding: 18px;">
                <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
    -->
            </td>
        </tr>
    </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                <!--[if mso]>
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
        <tr>
        <![endif]-->

        <!--[if mso]>
        <td valign="top" width="600" style="width:600px;">
        <![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>

                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

                            <h1 style="text-align: center;"><span style="font-size:14px"><span style="font-family:verdana,geneva,sans-serif"><strong>Hola, ${user}</strong></span></span></h1>

    <div style="text-align: center;"><span style="font-size:12px"><span style="font-family:verdana,geneva,sans-serif">Está recibiendo este correo electrónico porque usted (u otra<br> persona) ha solicitado restablecer la contraseña de su cuenta.<br> Haga clic en el siguiente enlace o copie el link y péguelo en su<br> navegador para completar el proceso:</span></span></div>

                        </td>
                    </tr>
                </tbody></table>
        <!--[if mso]>
        </td>
        <![endif]-->

        <!--[if mso]>
        </tr>
        </table>
        <![endif]-->
            </td>
        </tr>
    </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock" style="min-width:100%;">
    <!--[if gte mso 9]>
    <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%">
    <![endif]-->
    <tbody class="mcnBoxedTextBlockOuter">
        <tr>
            <td valign="top" class="mcnBoxedTextBlockInner">

        <!--[if gte mso 9]>
        <td align="center" valign="top" ">
        <![endif]-->
        <!--[if gte mso 9]>
        </td>
        <![endif]-->

        <!--[if gte mso 9]>
                </tr>
                </table>
        <![endif]-->
            </td>
        </tr>
    </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock" style="min-width:100%;background-color: #ECF9F1;">
    <tbody class="mcnButtonBlockOuter">
        <tr>
            <td style="padding-top:18px; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
                <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 35px;background-color: #158C30;padding: 3px 90px;">
                    <tbody>
                        <tr>
                            <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial; font-size: 16px; padding: 18px;">
                                <a href="${process.env.WEB_URL}/recuperar-contrasena/generar/${token}" class="mcnButton " title="Cambiar contraseña" href="" target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">Cambiar contraseña</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                <!--[if mso]>
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
        <tr>
        <![endif]-->

        <!--[if mso]>
        <td valign="top" width="600" style="width:600px;">
        <![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>

                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
                            <div style="text-align: center;"><span style="font-family:verdana,geneva,sans-serif"><span style="font-size:12px">Si no solicitó esto, ignore este correo electrónico y su<br> contraseña permanecerá sin cambios.</span></span></div><br>
                            <div style="text-align: center;"><span style="font-family:verdana,geneva,sans-serif"><span style="font-size:12px">Atentamente,<br>
    Ventana Menorca</span></span></div>

                        </td>
                    </tr>
                </tbody></table>
        <!--[if mso]>
        </td>
        <![endif]-->

        <!--[if mso]>
        </tr>
        </table>
        <![endif]-->
            </td>
        </tr>
    </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;background: #F5F5F5;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                <!--[if mso]>
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
        <tr>
        <![endif]-->

        <!--[if mso]>
        <td valign="top" width="300" style="width:300px;">
        <![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:300px;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>

                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-left:18px; padding-bottom:9px; padding-right:18px;">

                            <img data-file-id="5913809" height="39" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/a918743d-e512-7d2f-7593-f9de280fb9bc.png" style="border: 0px  ; width: 60px; height: 39px; margin: 0px;" width="60">
                        </td>
                    </tr>
                </tbody></table>
        <!--[if mso]>
        </td>
        <![endif]-->

        <!--[if mso]>
        <td valign="top" width="300" style="width:300px;">
        <![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:300px;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>

                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-left:18px; padding-bottom:9px; padding-right:18px;">

                            <div style="float:right;text-align:right;padding: 14px 0 0;">
                              <a href="https://instagram.com/menorcainversiones?igshid=10cetn29cdmvu" target="_blank"><img data-file-id="5913821" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/56759879-13ae-e122-c7cc-65e9c3fe710d.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                              <a href="https://www.facebook.com/menorcalotes" target="_blank"><img data-file-id="5913825" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/48690c0a-d09f-4380-86da-cb88dec0c82d.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                              <a href="https://tiktok.com/@menorcainversiones" target="_blank"><img data-file-id="5913817" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/1eea6d59-7251-f0c6-d657-2a157d2fc52e.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                              <a href="https://pe.linkedin.com/company/menorca-inversiones-s-a-c" target="_blank"><img data-file-id="5913813" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/2346c5ce-2cdd-fa62-7893-7f38700ba837.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>
                            </div>

                        </td>
                    </tr>
                </tbody></table>
        <!--[if mso]>
        </td>
        <![endif]-->

        <!--[if mso]>
        </tr>
        </table>
        <![endif]-->
            </td>
        </tr>
    </tbody>
    </table></td>
                            </tr>

                        </table>
                        <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                        <!-- // END TEMPLATE -->
                    </td>
                </tr>
            </table>
        </center>
    <script type="text/javascript"  src="/PxtHz/uB/J/1/CvUJv9EyAQ4/b55fLcDLEwiV/Ay4KP0QVAw/DjxY/PBkpEjE"></script></body>
    </html>
    `;
  },
  statusUpdate(user, supervisor, code, status, ticketId) {
    return `<!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <!-- NAME: 1 COLUMN -->
        <!--[if gte mso 15]>
        <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>*|MC:SUBJECT|*</title>

    <style type="text/css">
    p{
      margin:10px 0;
      padding:0;
    }
    table{
      border-collapse:collapse;
    }
    h1,h2,h3,h4,h5,h6{
      display:block;
      margin:0;
      padding:0;
    }
    img,a img{
      border:0;
      height:auto;
      outline:none;
      text-decoration:none;
    }
    body,#bodyTable,#bodyCell{
      height:100%;
      margin:0;
      padding:0;
      width:100%;
    }
    .mcnPreviewText{
      display:none !important;
    }
    #outlook a{
      padding:0;
    }
    img{
      -ms-interpolation-mode:bicubic;
    }
    table{
      mso-table-lspace:0pt;
      mso-table-rspace:0pt;
    }
    .ReadMsgBody{
      width:100%;
    }
    .ExternalClass{
      width:100%;
    }
    p,a,li,td,blockquote{
      mso-line-height-rule:exactly;
    }
    a[href^=tel],a[href^=sms]{
      color:inherit;
      cursor:default;
      text-decoration:none;
    }
    p,a,li,td,body,table,blockquote{
      -ms-text-size-adjust:100%;
      -webkit-text-size-adjust:100%;
    }
    .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
      line-height:100%;
    }
    a[x-apple-data-detectors]{
      color:inherit !important;
      text-decoration:none !important;
      font-size:inherit !important;
      font-family:inherit !important;
      font-weight:inherit !important;
      line-height:inherit !important;
    }
    #bodyCell{
      padding:10px;
    }
    .templateContainer{
      max-width:600px !important;
      border-collapse: collapse;
          border-radius: 16px;
        border-style: hidden !important;
        box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
    }

    a.mcnButton{
      display:block;
    }
    .mcnImage,.mcnRetinaImage{
      vertical-align:bottom;
    }
    .mcnTextContent{
      word-break:break-word;
    }
    .mcnTextContent img{
      height:auto !important;
    }
    .mcnDividerBlock{
      table-layout:fixed !important;
    }
    /*
    @tab Page
    @section Background Style
    @tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
    */
    body,#bodyTable{
      /*@editable*/background-color:#FAFAFA;
    }
    /*
    @tab Page
    @section Background Style
    @tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
    */
    #bodyCell{
      /*@editable*/border-top:0;
    }
    /*
    @tab Page
    @section Email Border
    @tip Set the border for your email.
    */
    .templateContainer{
      /*@editable*/border:0;
      box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
    }
    /*
    @tab Page
    @section Heading 1
    @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
    @style heading 1
    */
    h1{
      /*@editable*/color:#202020;
      /*@editable*/font-family:Helvetica;
      /*@editable*/font-size:26px;
      /*@editable*/font-style:normal;
      /*@editable*/font-weight:bold;
      /*@editable*/line-height:125%;
      /*@editable*/letter-spacing:normal;
      /*@editable*/text-align:left;
    }
    /*
    @tab Page
    @section Heading 2
    @tip Set the styling for all second-level headings in your emails.
    @style heading 2
    */
    h2{
      /*@editable*/color:#202020;
      /*@editable*/font-family:Helvetica;
      /*@editable*/font-size:22px;
      /*@editable*/font-style:normal;
      /*@editable*/font-weight:bold;
      /*@editable*/line-height:125%;
      /*@editable*/letter-spacing:normal;
      /*@editable*/text-align:left;
    }
    /*
    @tab Page
    @section Heading 3
    @tip Set the styling for all third-level headings in your emails.
    @style heading 3
    */
    h3{
      /*@editable*/color:#202020;
      /*@editable*/font-family:Helvetica;
      /*@editable*/font-size:20px;
      /*@editable*/font-style:normal;
      /*@editable*/font-weight:bold;
      /*@editable*/line-height:125%;
      /*@editable*/letter-spacing:normal;
      /*@editable*/text-align:left;
    }
    /*
    @tab Page
    @section Heading 4
    @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
    @style heading 4
    */
    h4{
      /*@editable*/color:#202020;
      /*@editable*/font-family:Helvetica;
      /*@editable*/font-size:18px;
      /*@editable*/font-style:normal;
      /*@editable*/font-weight:bold;
      /*@editable*/line-height:125%;
      /*@editable*/letter-spacing:normal;
      /*@editable*/text-align:left;
    }
    /*
    @tab Preheader
    @section Preheader Style
    @tip Set the background color and borders for your email's preheader area.
    */
    #templatePreheader{
      /*@editable*/background-color:#FAFAFA;
      /*@editable*/background-image:none;
      /*@editable*/background-repeat:no-repeat;
      /*@editable*/background-position:center;
      /*@editable*/background-size:cover;
      /*@editable*/border-top:0;
      /*@editable*/border-bottom:0;
      /*@editable*/padding-top:9px;
      /*@editable*/padding-bottom:9px;
    }
    /*
    @tab Preheader
    @section Preheader Text
    @tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
    */
    #templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
      /*@editable*/color:#656565;
      /*@editable*/font-family:Helvetica;
      /*@editable*/font-size:12px;
      /*@editable*/line-height:150%;
      /*@editable*/text-align:left;
    }
    /*
    @tab Preheader
    @section Preheader Link
    @tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
    */
    #templatePreheader .mcnTextContent a,#templatePreheader .mcnTextContent p a{
      /*@editable*/color:#656565;
      /*@editable*/font-weight:normal;
      /*@editable*/text-decoration:underline;
    }
    /*
    @tab Header
    @section Header Style
    @tip Set the background color and borders for your email's header area.
    */
    #templateHeader{
      background-color: initial;
      /*@editable*/background-image:none;
      /*@editable*/background-repeat:no-repeat;
      /*@editable*/background-position:center;
      /*@editable*/background-size:cover;
      /*@editable*/border-top:0;
      /*@editable*/border-bottom:0;
      /*@editable*/padding-top:9px;
      /*@editable*/padding-bottom:0;
    }
    /*
    @tab Header
    @section Header Text
    @tip Set the styling for your email's header text. Choose a size and color that is easy to read.
    */
    #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
      /*@editable*/color:#202020;
      /*@editable*/font-family:Helvetica;
      /*@editable*/font-size:16px;
      /*@editable*/line-height:150%;
      /*@editable*/text-align:left;
    }
    /*
    @tab Header
    @section Header Link
    @tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
    */
    #templateHeader .mcnTextContent a,#templateHeader .mcnTextContent p a{
      /*@editable*/color:#007C89;
      /*@editable*/font-weight:normal;
      /*@editable*/text-decoration:underline;
    }
    /*
    @tab Body
    @section Body Style
    @tip Set the background color and borders for your email's body area.
    */
    #templateBody{
      background-color: initial !important;
      /*@editable*/background-image:none;
      /*@editable*/background-repeat:no-repeat;
      /*@editable*/background-position:center;
      /*@editable*/background-size:cover;
      /*@editable*/border-top:0;
      /*@editable*/border-bottom:2px solid #EAEAEA;
      /*@editable*/padding-top:0;
      /*@editable*/padding-bottom:0;
    }
    /*
    @tab Body
    @section Body Text
    @tip Set the styling for your email's body text. Choose a size and color that is easy to read.
    */
    #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
      /*@editable*/color:#202020;
      /*@editable*/font-family:Helvetica;
      /*@editable*/font-size:16px;
      /*@editable*/line-height:150%;
      /*@editable*/text-align:left;
    }
    /*
    @tab Body
    @section Body Link
    @tip Set the styling for your email's body links. Choose a color that helps them stand out from your text.
    */
    #templateBody .mcnTextContent a,#templateBody .mcnTextContent p a{
      /*@editable*/color:#007C89;
      /*@editable*/font-weight:normal;
      /*@editable*/text-decoration:underline;
    }
    /*
    @tab Footer
    @section Footer Style
    @tip Set the background color and borders for your email's footer area.
    */
    #templateFooter{
      /*@editable*/background-color:#FAFAFA;
      /*@editable*/background-image:none;
      /*@editable*/background-repeat:no-repeat;
      /*@editable*/background-position:center;
      /*@editable*/background-size:cover;
      /*@editable*/border-top:0;
      /*@editable*/border-bottom:0;
      /*@editable*/padding-top:9px;
      /*@editable*/padding-bottom:9px;
    }
    /*
    @tab Footer
    @section Footer Text
    @tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
    */
    #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
      /*@editable*/color:#656565;
      /*@editable*/font-family:Helvetica;
      /*@editable*/font-size:12px;
      /*@editable*/line-height:150%;
      /*@editable*/text-align:center;
    }
    /*
    @tab Footer
    @section Footer Link
    @tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
    */
    #templateFooter .mcnTextContent a,#templateFooter .mcnTextContent p a{
      /*@editable*/color:#656565;
      /*@editable*/font-weight:normal;
      /*@editable*/text-decoration:underline;
    }
    @media only screen and (min-width:768px){
    .templateContainer{
      width:600px !important;
    }

    }	@media only screen and (max-width: 480px){
    body,table,td,p,a,li,blockquote{
      -webkit-text-size-adjust:none !important;
    }

    }	@media only screen and (max-width: 480px){
    body{
      width:100% !important;
      min-width:100% !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnRetinaImage{
      max-width:100% !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnImage{
      width:100% !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
      max-width:100% !important;
      width:100% !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnBoxedTextContentContainer{
      min-width:100% !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnImageGroupContent{
      padding:9px !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
      padding-top:9px !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
      padding-top:18px !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnImageCardBottomImageContent{
      padding-bottom:9px !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnImageGroupBlockInner{
      padding-top:0 !important;
      padding-bottom:0 !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnImageGroupBlockOuter{
      padding-top:9px !important;
      padding-bottom:9px !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnTextContent,.mcnBoxedTextContentColumn{
      padding-right:18px !important;
      padding-left:18px !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
      padding-right:18px !important;
      padding-bottom:0 !important;
      padding-left:18px !important;
    }

    }	@media only screen and (max-width: 480px){
    .mcpreview-image-uploader{
      display:none !important;
      width:100% !important;
    }

    }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Heading 1
    @tip Make the first-level headings larger in size for better readability on small screens.
    */
    h1{
      /*@editable*/font-size:22px !important;
      /*@editable*/line-height:125% !important;
    }

    }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Heading 2
    @tip Make the second-level headings larger in size for better readability on small screens.
    */
    h2{
      /*@editable*/font-size:20px !important;
      /*@editable*/line-height:125% !important;
    }

    }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Heading 3
    @tip Make the third-level headings larger in size for better readability on small screens.
    */
    h3{
      /*@editable*/font-size:18px !important;
      /*@editable*/line-height:125% !important;
    }

    }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Heading 4
    @tip Make the fourth-level headings larger in size for better readability on small screens.
    */
    h4{
      /*@editable*/font-size:16px !important;
      /*@editable*/line-height:150% !important;
    }

    }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Boxed Text
    @tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
    */
    .mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
      /*@editable*/font-size:14px !important;
      /*@editable*/line-height:150% !important;
    }

    }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Preheader Visibility
    @tip Set the visibility of the email's preheader on small screens. You can hide it to save space.
    */
    #templatePreheader{
      /*@editable*/display:block !important;
    }

    }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Preheader Text
    @tip Make the preheader text larger in size for better readability on small screens.
    */
    #templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
      /*@editable*/font-size:14px !important;
      /*@editable*/line-height:150% !important;
    }

    }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Header Text
    @tip Make the header text larger in size for better readability on small screens.
    */
    #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
      /*@editable*/font-size:16px !important;
      /*@editable*/line-height:150% !important;
    }

    }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Body Text
    @tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
    */
    #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
      /*@editable*/font-size:16px !important;
      /*@editable*/line-height:150% !important;
    }

    }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Footer Text
    @tip Make the footer content text larger in size for better readability on small screens.
    */
    #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
      /*@editable*/font-size:14px !important;
      /*@editable*/line-height:150% !important;
    }

    }</style></head>
    <body>
        <center>
            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                <tr>
                    <td align="center" valign="top" id="bodyCell">
                        <!-- BEGIN TEMPLATE // -->
                        <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                        <tr>
                        <td align="center" valign="top" width="600" style="width:600px;">
                        <![endif]-->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="max-width: 600px !important;">

                            <tr>
                                <td valign="top" id="templateHeader"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
    <tbody class="mcnImageBlockOuter">
            <tr>
                <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                        <tbody><tr>
                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">


                                        <img align="center" alt="" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/cb932210-f8ff-ef26-fe34-0f06df8a8519.png" width="279" style="max-width:279px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage">


                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
    </tbody>
    </table></td>
                            </tr>
                            <tr>
                                <td valign="top" id="templateBody"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
    <tbody class="mcnDividerBlockOuter">
        <tr>
            <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
                <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #EAEAEA;">
                    <tbody><tr>
                        <td>
                            <span></span>
                        </td>
                    </tr>
                </tbody></table>
    <!--
                <td class="mcnDividerBlockInner" style="padding: 18px;">
                <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
    -->
            </td>
        </tr>
    </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                <!--[if mso]>
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
        <tr>
        <![endif]-->

        <!--[if mso]>
        <td valign="top" width="600" style="width:600px;">
        <![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>

                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

                            <h1 style="text-align: center;"><span style="font-size:14px"><span style="font-family:verdana,geneva,sans-serif"><strong>Hola, ${user}</strong></span></span></h1>

    <div style="text-align: center;"><span style="font-size:12px"><span style="font-family:verdana,geneva,sans-serif">Se ha registrado un cambio de estado en su solicitud a <b>${status}</b>. Nuestro(a) ejecutivo(a) ${supervisor}, está revisando la solicitud <b>#${code}</b>. Pronto le brindaremos una solución, gracias por su amable espera.</span></span></div>

                        </td>
                    </tr>
                </tbody></table>
        <!--[if mso]>
        </td>
        <![endif]-->

        <!--[if mso]>
        </tr>
        </table>
        <![endif]-->
            </td>
        </tr>
    </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock" style="min-width:100%;">
    <!--[if gte mso 9]>
    <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%">
    <![endif]-->
    <tbody class="mcnBoxedTextBlockOuter">
        <tr>
            <td valign="top" class="mcnBoxedTextBlockInner">

        <!--[if gte mso 9]>
        <td align="center" valign="top" ">
        <![endif]-->
        <!--[if gte mso 9]>
        </td>
        <![endif]-->

        <!--[if gte mso 9]>
                </tr>
                </table>
        <![endif]-->
            </td>
        </tr>
    </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock" style="min-width:100%;background-color: #ECF9F1;">
    <tbody class="mcnButtonBlockOuter">
        <tr>
            <td style="padding-top:18px; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
                <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 35px;background-color: #158C30;padding: 3px 90px;">
                    <tbody>
                        <tr>
                            <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial; font-size: 16px; padding: 18px;">
                                <a href="https://proyectos.picnic.pe/menorca/ventana/atencion-al-cliente/detalle/${ticketId}" class="mcnButton " title="Ver solicitud" href="" target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">Ver solicitud</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                <!--[if mso]>
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
        <tr>
        <![endif]-->

        <!--[if mso]>
        <td valign="top" width="600" style="width:600px;">
        <![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>

                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

                            <div style="text-align: center;"><span style="font-family:verdana,geneva,sans-serif"><span style="font-size:12px">Atentamente,<br>
    Ventana Menorca</span></span></div>

                        </td>
                    </tr>
                </tbody></table>
        <!--[if mso]>
        </td>
        <![endif]-->

        <!--[if mso]>
        </tr>
        </table>
        <![endif]-->
            </td>
        </tr>
    </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;background: #F5F5F5;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                <!--[if mso]>
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
        <tr>
        <![endif]-->

        <!--[if mso]>
        <td valign="top" width="300" style="width:300px;">
        <![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:300px;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>

                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-left:18px; padding-bottom:9px; padding-right:18px;">

                            <img data-file-id="5913809" height="39" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/a918743d-e512-7d2f-7593-f9de280fb9bc.png" style="border: 0px  ; width: 60px; height: 39px; margin: 0px;" width="60">
                        </td>
                    </tr>
                </tbody></table>
        <!--[if mso]>
        </td>
        <![endif]-->

        <!--[if mso]>
        <td valign="top" width="300" style="width:300px;">
        <![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:300px;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>

                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-left:18px; padding-bottom:9px; padding-right:18px;">

                            <div style="float:right;text-align:right;padding: 14px 0 0;">
                              <a href="https://instagram.com/menorcainversiones?igshid=10cetn29cdmvu" target="_blank"><img data-file-id="5913821" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/56759879-13ae-e122-c7cc-65e9c3fe710d.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                              <a href="https://www.facebook.com/menorcalotes" target="_blank"><img data-file-id="5913825" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/48690c0a-d09f-4380-86da-cb88dec0c82d.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                              <a href="https://tiktok.com/@menorcainversiones" target="_blank"><img data-file-id="5913817" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/1eea6d59-7251-f0c6-d657-2a157d2fc52e.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                              <a href="https://pe.linkedin.com/company/menorca-inversiones-s-a-c" target="_blank"><img data-file-id="5913813" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/2346c5ce-2cdd-fa62-7893-7f38700ba837.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>
                            </div>

                        </td>
                    </tr>
                </tbody></table>
        <!--[if mso]>
        </td>
        <![endif]-->

        <!--[if mso]>
        </tr>
        </table>
        <![endif]-->
            </td>
        </tr>
    </tbody>
    </table></td>
                            </tr>

                        </table>
                        <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                        <!-- // END TEMPLATE -->
                    </td>
                </tr>
            </table>
        </center>
    <script type="text/javascript"  src="/PxtHz/uB/J/1/CvUJv9EyAQ4/b55fLcDLEwiV/Ay4KP0QVAw/DjxY/PBkpEjE"></script></body>
    </html>
    `;
  },
  statusClosed(user, supervisor, code, status, ticketId) {
    return `<!doctype html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
      <!-- NAME: 1 COLUMN -->
      <!--[if gte mso 15]>
      <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>*|MC:SUBJECT|*</title>

  <style type="text/css">
  p{
    margin:10px 0;
    padding:0;
  }
  table{
    border-collapse:collapse;
  }
  h1,h2,h3,h4,h5,h6{
    display:block;
    margin:0;
    padding:0;
  }
  img,a img{
    border:0;
    height:auto;
    outline:none;
    text-decoration:none;
  }
  body,#bodyTable,#bodyCell{
    height:100%;
    margin:0;
    padding:0;
    width:100%;
  }
  .mcnPreviewText{
    display:none !important;
  }
  #outlook a{
    padding:0;
  }
  img{
    -ms-interpolation-mode:bicubic;
  }
  table{
    mso-table-lspace:0pt;
    mso-table-rspace:0pt;
  }
  .ReadMsgBody{
    width:100%;
  }
  .ExternalClass{
    width:100%;
  }
  p,a,li,td,blockquote{
    mso-line-height-rule:exactly;
  }
  a[href^=tel],a[href^=sms]{
    color:inherit;
    cursor:default;
    text-decoration:none;
  }
  p,a,li,td,body,table,blockquote{
    -ms-text-size-adjust:100%;
    -webkit-text-size-adjust:100%;
  }
  .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
    line-height:100%;
  }
  a[x-apple-data-detectors]{
    color:inherit !important;
    text-decoration:none !important;
    font-size:inherit !important;
    font-family:inherit !important;
    font-weight:inherit !important;
    line-height:inherit !important;
  }
  #bodyCell{
    padding:10px;
  }
  .templateContainer{
    max-width:600px !important;
    border-collapse: collapse;
        border-radius: 16px;
      border-style: hidden !important;
      box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
  }

  a.mcnButton{
    display:block;
  }
  .mcnImage,.mcnRetinaImage{
    vertical-align:bottom;
  }
  .mcnTextContent{
    word-break:break-word;
  }
  .mcnTextContent img{
    height:auto !important;
  }
  .mcnDividerBlock{
    table-layout:fixed !important;
  }
  /*
  @tab Page
  @section Background Style
  @tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
  */
  body,#bodyTable{
    /*@editable*/background-color:#FAFAFA;
  }
  /*
  @tab Page
  @section Background Style
  @tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
  */
  #bodyCell{
    /*@editable*/border-top:0;
  }
  /*
  @tab Page
  @section Email Border
  @tip Set the border for your email.
  */
  .templateContainer{
    /*@editable*/border:0;
    box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
  }
  /*
  @tab Page
  @section Heading 1
  @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
  @style heading 1
  */
  h1{
    /*@editable*/color:#202020;
    /*@editable*/font-family:Helvetica;
    /*@editable*/font-size:26px;
    /*@editable*/font-style:normal;
    /*@editable*/font-weight:bold;
    /*@editable*/line-height:125%;
    /*@editable*/letter-spacing:normal;
    /*@editable*/text-align:left;
  }
  /*
  @tab Page
  @section Heading 2
  @tip Set the styling for all second-level headings in your emails.
  @style heading 2
  */
  h2{
    /*@editable*/color:#202020;
    /*@editable*/font-family:Helvetica;
    /*@editable*/font-size:22px;
    /*@editable*/font-style:normal;
    /*@editable*/font-weight:bold;
    /*@editable*/line-height:125%;
    /*@editable*/letter-spacing:normal;
    /*@editable*/text-align:left;
  }
  /*
  @tab Page
  @section Heading 3
  @tip Set the styling for all third-level headings in your emails.
  @style heading 3
  */
  h3{
    /*@editable*/color:#202020;
    /*@editable*/font-family:Helvetica;
    /*@editable*/font-size:20px;
    /*@editable*/font-style:normal;
    /*@editable*/font-weight:bold;
    /*@editable*/line-height:125%;
    /*@editable*/letter-spacing:normal;
    /*@editable*/text-align:left;
  }
  /*
  @tab Page
  @section Heading 4
  @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
  @style heading 4
  */
  h4{
    /*@editable*/color:#202020;
    /*@editable*/font-family:Helvetica;
    /*@editable*/font-size:18px;
    /*@editable*/font-style:normal;
    /*@editable*/font-weight:bold;
    /*@editable*/line-height:125%;
    /*@editable*/letter-spacing:normal;
    /*@editable*/text-align:left;
  }
  /*
  @tab Preheader
  @section Preheader Style
  @tip Set the background color and borders for your email's preheader area.
  */
  #templatePreheader{
    /*@editable*/background-color:#FAFAFA;
    /*@editable*/background-image:none;
    /*@editable*/background-repeat:no-repeat;
    /*@editable*/background-position:center;
    /*@editable*/background-size:cover;
    /*@editable*/border-top:0;
    /*@editable*/border-bottom:0;
    /*@editable*/padding-top:9px;
    /*@editable*/padding-bottom:9px;
  }
  /*
  @tab Preheader
  @section Preheader Text
  @tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
  */
  #templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
    /*@editable*/color:#656565;
    /*@editable*/font-family:Helvetica;
    /*@editable*/font-size:12px;
    /*@editable*/line-height:150%;
    /*@editable*/text-align:left;
  }
  /*
  @tab Preheader
  @section Preheader Link
  @tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
  */
  #templatePreheader .mcnTextContent a,#templatePreheader .mcnTextContent p a{
    /*@editable*/color:#656565;
    /*@editable*/font-weight:normal;
    /*@editable*/text-decoration:underline;
  }
  /*
  @tab Header
  @section Header Style
  @tip Set the background color and borders for your email's header area.
  */
  #templateHeader{
    background-color: initial;
    /*@editable*/background-image:none;
    /*@editable*/background-repeat:no-repeat;
    /*@editable*/background-position:center;
    /*@editable*/background-size:cover;
    /*@editable*/border-top:0;
    /*@editable*/border-bottom:0;
    /*@editable*/padding-top:9px;
    /*@editable*/padding-bottom:0;
  }
  /*
  @tab Header
  @section Header Text
  @tip Set the styling for your email's header text. Choose a size and color that is easy to read.
  */
  #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
    /*@editable*/color:#202020;
    /*@editable*/font-family:Helvetica;
    /*@editable*/font-size:16px;
    /*@editable*/line-height:150%;
    /*@editable*/text-align:left;
  }
  /*
  @tab Header
  @section Header Link
  @tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
  */
  #templateHeader .mcnTextContent a,#templateHeader .mcnTextContent p a{
    /*@editable*/color:#007C89;
    /*@editable*/font-weight:normal;
    /*@editable*/text-decoration:underline;
  }
  /*
  @tab Body
  @section Body Style
  @tip Set the background color and borders for your email's body area.
  */
  #templateBody{
    background-color: initial !important;
    /*@editable*/background-image:none;
    /*@editable*/background-repeat:no-repeat;
    /*@editable*/background-position:center;
    /*@editable*/background-size:cover;
    /*@editable*/border-top:0;
    /*@editable*/border-bottom:2px solid #EAEAEA;
    /*@editable*/padding-top:0;
    /*@editable*/padding-bottom:0;
  }
  /*
  @tab Body
  @section Body Text
  @tip Set the styling for your email's body text. Choose a size and color that is easy to read.
  */
  #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
    /*@editable*/color:#202020;
    /*@editable*/font-family:Helvetica;
    /*@editable*/font-size:16px;
    /*@editable*/line-height:150%;
    /*@editable*/text-align:left;
  }
  /*
  @tab Body
  @section Body Link
  @tip Set the styling for your email's body links. Choose a color that helps them stand out from your text.
  */
  #templateBody .mcnTextContent a,#templateBody .mcnTextContent p a{
    /*@editable*/color:#007C89;
    /*@editable*/font-weight:normal;
    /*@editable*/text-decoration:underline;
  }
  /*
  @tab Footer
  @section Footer Style
  @tip Set the background color and borders for your email's footer area.
  */
  #templateFooter{
    /*@editable*/background-color:#FAFAFA;
    /*@editable*/background-image:none;
    /*@editable*/background-repeat:no-repeat;
    /*@editable*/background-position:center;
    /*@editable*/background-size:cover;
    /*@editable*/border-top:0;
    /*@editable*/border-bottom:0;
    /*@editable*/padding-top:9px;
    /*@editable*/padding-bottom:9px;
  }
  /*
  @tab Footer
  @section Footer Text
  @tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
  */
  #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
    /*@editable*/color:#656565;
    /*@editable*/font-family:Helvetica;
    /*@editable*/font-size:12px;
    /*@editable*/line-height:150%;
    /*@editable*/text-align:center;
  }
  /*
  @tab Footer
  @section Footer Link
  @tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
  */
  #templateFooter .mcnTextContent a,#templateFooter .mcnTextContent p a{
    /*@editable*/color:#656565;
    /*@editable*/font-weight:normal;
    /*@editable*/text-decoration:underline;
  }
  @media only screen and (min-width:768px){
  .templateContainer{
    width:600px !important;
  }

  }	@media only screen and (max-width: 480px){
  body,table,td,p,a,li,blockquote{
    -webkit-text-size-adjust:none !important;
  }

  }	@media only screen and (max-width: 480px){
  body{
    width:100% !important;
    min-width:100% !important;
  }

  }	@media only screen and (max-width: 480px){
  .mcnRetinaImage{
    max-width:100% !important;
  }

  }	@media only screen and (max-width: 480px){
  .mcnImage{
    width:100% !important;
  }

  }	@media only screen and (max-width: 480px){
  .mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
    max-width:100% !important;
    width:100% !important;
  }

  }	@media only screen and (max-width: 480px){
  .mcnBoxedTextContentContainer{
    min-width:100% !important;
  }

  }	@media only screen and (max-width: 480px){
  .mcnImageGroupContent{
    padding:9px !important;
  }

  }	@media only screen and (max-width: 480px){
  .mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
    padding-top:9px !important;
  }

  }	@media only screen and (max-width: 480px){
  .mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
    padding-top:18px !important;
  }

  }	@media only screen and (max-width: 480px){
  .mcnImageCardBottomImageContent{
    padding-bottom:9px !important;
  }

  }	@media only screen and (max-width: 480px){
  .mcnImageGroupBlockInner{
    padding-top:0 !important;
    padding-bottom:0 !important;
  }

  }	@media only screen and (max-width: 480px){
  .mcnImageGroupBlockOuter{
    padding-top:9px !important;
    padding-bottom:9px !important;
  }

  }	@media only screen and (max-width: 480px){
  .mcnTextContent,.mcnBoxedTextContentColumn{
    padding-right:18px !important;
    padding-left:18px !important;
  }

  }	@media only screen and (max-width: 480px){
  .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
    padding-right:18px !important;
    padding-bottom:0 !important;
    padding-left:18px !important;
  }

  }	@media only screen and (max-width: 480px){
  .mcpreview-image-uploader{
    display:none !important;
    width:100% !important;
  }

  }	@media only screen and (max-width: 480px){
  /*
  @tab Mobile Styles
  @section Heading 1
  @tip Make the first-level headings larger in size for better readability on small screens.
  */
  h1{
    /*@editable*/font-size:22px !important;
    /*@editable*/line-height:125% !important;
  }

  }	@media only screen and (max-width: 480px){
  /*
  @tab Mobile Styles
  @section Heading 2
  @tip Make the second-level headings larger in size for better readability on small screens.
  */
  h2{
    /*@editable*/font-size:20px !important;
    /*@editable*/line-height:125% !important;
  }

  }	@media only screen and (max-width: 480px){
  /*
  @tab Mobile Styles
  @section Heading 3
  @tip Make the third-level headings larger in size for better readability on small screens.
  */
  h3{
    /*@editable*/font-size:18px !important;
    /*@editable*/line-height:125% !important;
  }

  }	@media only screen and (max-width: 480px){
  /*
  @tab Mobile Styles
  @section Heading 4
  @tip Make the fourth-level headings larger in size for better readability on small screens.
  */
  h4{
    /*@editable*/font-size:16px !important;
    /*@editable*/line-height:150% !important;
  }

  }	@media only screen and (max-width: 480px){
  /*
  @tab Mobile Styles
  @section Boxed Text
  @tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
  */
  .mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
    /*@editable*/font-size:14px !important;
    /*@editable*/line-height:150% !important;
  }

  }	@media only screen and (max-width: 480px){
  /*
  @tab Mobile Styles
  @section Preheader Visibility
  @tip Set the visibility of the email's preheader on small screens. You can hide it to save space.
  */
  #templatePreheader{
    /*@editable*/display:block !important;
  }

  }	@media only screen and (max-width: 480px){
  /*
  @tab Mobile Styles
  @section Preheader Text
  @tip Make the preheader text larger in size for better readability on small screens.
  */
  #templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
    /*@editable*/font-size:14px !important;
    /*@editable*/line-height:150% !important;
  }

  }	@media only screen and (max-width: 480px){
  /*
  @tab Mobile Styles
  @section Header Text
  @tip Make the header text larger in size for better readability on small screens.
  */
  #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
    /*@editable*/font-size:16px !important;
    /*@editable*/line-height:150% !important;
  }

  }	@media only screen and (max-width: 480px){
  /*
  @tab Mobile Styles
  @section Body Text
  @tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
  */
  #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
    /*@editable*/font-size:16px !important;
    /*@editable*/line-height:150% !important;
  }

  }	@media only screen and (max-width: 480px){
  /*
  @tab Mobile Styles
  @section Footer Text
  @tip Make the footer content text larger in size for better readability on small screens.
  */
  #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
    /*@editable*/font-size:14px !important;
    /*@editable*/line-height:150% !important;
  }

  }</style></head>
  <body>
      <center>
          <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
              <tr>
                  <td align="center" valign="top" id="bodyCell">
                      <!-- BEGIN TEMPLATE // -->
                      <!--[if (gte mso 9)|(IE)]>
                      <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                      <tr>
                      <td align="center" valign="top" width="600" style="width:600px;">
                      <![endif]-->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="max-width: 600px !important;">

                          <tr>
                              <td valign="top" id="templateHeader"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
  <tbody class="mcnImageBlockOuter">
          <tr>
              <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                  <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                      <tbody><tr>
                          <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">


                                      <img align="center" alt="" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/cb932210-f8ff-ef26-fe34-0f06df8a8519.png" width="279" style="max-width:279px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage">


                          </td>
                      </tr>
                  </tbody></table>
              </td>
          </tr>
  </tbody>
  </table></td>
                          </tr>
                          <tr>
                              <td valign="top" id="templateBody"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
  <tbody class="mcnDividerBlockOuter">
      <tr>
          <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
              <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #EAEAEA;">
                  <tbody><tr>
                      <td>
                          <span></span>
                      </td>
                  </tr>
              </tbody></table>
  <!--
              <td class="mcnDividerBlockInner" style="padding: 18px;">
              <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
  -->
          </td>
      </tr>
  </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
  <tbody class="mcnTextBlockOuter">
      <tr>
          <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              <!--[if mso]>
      <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
      <tr>
      <![endif]-->

      <!--[if mso]>
      <td valign="top" width="600" style="width:600px;">
      <![endif]-->
              <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                  <tbody><tr>

                      <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

                          <h1 style="text-align: center;"><span style="font-size:14px"><span style="font-family:verdana,geneva,sans-serif"><strong>Hola, ${user}</strong></span></span></h1>

  <div style="text-align: center;"><span style="font-size:12px"><span style="font-family:verdana,geneva,sans-serif">Su solicitud <b>#${code}</b> ha sido cerrada por nuestro(a) ejecutivo(a) ${supervisor}, gracias por utilizar Ventana Menorca.</span></span></div>

                      </td>
                  </tr>
              </tbody></table>
      <!--[if mso]>
      </td>
      <![endif]-->

      <!--[if mso]>
      </tr>
      </table>
      <![endif]-->
          </td>
      </tr>
  </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock" style="min-width:100%;">
  <!--[if gte mso 9]>
  <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%">
  <![endif]-->
  <tbody class="mcnBoxedTextBlockOuter">
      <tr>
          <td valign="top" class="mcnBoxedTextBlockInner">

      <!--[if gte mso 9]>
      <td align="center" valign="top" ">
      <![endif]-->
      <!--[if gte mso 9]>
      </td>
      <![endif]-->

      <!--[if gte mso 9]>
              </tr>
              </table>
      <![endif]-->
          </td>
      </tr>
  </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock" style="min-width:100%;background-color: #ECF9F1;">
  <tbody class="mcnButtonBlockOuter">
      <tr>
          <td style="padding-top:18px; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
              <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 35px;background-color: #158C30;padding: 3px 90px;">
                  <tbody>
                      <tr>
                          <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial; font-size: 16px; padding: 18px;">
                              <a href="https://proyectos.picnic.pe/menorca/ventana/atencion-al-cliente/detalle/${ticketId}" class="mcnButton " title="Ver solicitud" href="" target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">Ver solicitud</a>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </td>
      </tr>
  </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
  <tbody class="mcnTextBlockOuter">
      <tr>
          <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              <!--[if mso]>
      <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
      <tr>
      <![endif]-->

      <!--[if mso]>
      <td valign="top" width="600" style="width:600px;">
      <![endif]-->
              <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                  <tbody><tr>

                      <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

                          <div style="text-align: center;"><span style="font-family:verdana,geneva,sans-serif"><span style="font-size:12px">Atentamente,<br>
  Ventana Menorca</span></span></div>

                      </td>
                  </tr>
              </tbody></table>
      <!--[if mso]>
      </td>
      <![endif]-->

      <!--[if mso]>
      </tr>
      </table>
      <![endif]-->
          </td>
      </tr>
  </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;background: #F5F5F5;">
  <tbody class="mcnTextBlockOuter">
      <tr>
          <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              <!--[if mso]>
      <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
      <tr>
      <![endif]-->

      <!--[if mso]>
      <td valign="top" width="300" style="width:300px;">
      <![endif]-->
              <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:300px;" width="100%" class="mcnTextContentContainer">
                  <tbody><tr>

                      <td valign="top" class="mcnTextContent" style="padding-top:0; padding-left:18px; padding-bottom:9px; padding-right:18px;">

                          <img data-file-id="5913809" height="39" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/a918743d-e512-7d2f-7593-f9de280fb9bc.png" style="border: 0px  ; width: 60px; height: 39px; margin: 0px;" width="60">
                      </td>
                  </tr>
              </tbody></table>
      <!--[if mso]>
      </td>
      <![endif]-->

      <!--[if mso]>
      <td valign="top" width="300" style="width:300px;">
      <![endif]-->
              <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:300px;" width="100%" class="mcnTextContentContainer">
                  <tbody><tr>

                      <td valign="top" class="mcnTextContent" style="padding-top:0; padding-left:18px; padding-bottom:9px; padding-right:18px;">

                          <div style="float:right;text-align:right;padding: 14px 0 0;">
                            <a href="https://instagram.com/menorcainversiones?igshid=10cetn29cdmvu" target="_blank"><img data-file-id="5913821" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/56759879-13ae-e122-c7cc-65e9c3fe710d.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                            <a href="https://www.facebook.com/menorcalotes" target="_blank"><img data-file-id="5913825" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/48690c0a-d09f-4380-86da-cb88dec0c82d.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                            <a href="https://tiktok.com/@menorcainversiones" target="_blank"><img data-file-id="5913817" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/1eea6d59-7251-f0c6-d657-2a157d2fc52e.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                            <a href="https://pe.linkedin.com/company/menorca-inversiones-s-a-c" target="_blank"><img data-file-id="5913813" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/2346c5ce-2cdd-fa62-7893-7f38700ba837.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>
                          </div>

                      </td>
                  </tr>
              </tbody></table>
      <!--[if mso]>
      </td>
      <![endif]-->

      <!--[if mso]>
      </tr>
      </table>
      <![endif]-->
          </td>
      </tr>
  </tbody>
  </table></td>
                          </tr>

                      </table>
                      <!--[if (gte mso 9)|(IE)]>
                      </td>
                      </tr>
                      </table>
                      <![endif]-->
                      <!-- // END TEMPLATE -->
                  </td>
              </tr>
          </table>
      </center>
  <script type="text/javascript"  src="/PxtHz/uB/J/1/CvUJv9EyAQ4/b55fLcDLEwiV/Ay4KP0QVAw/DjxY/PBkpEjE"></script></body>
  </html>
  `;
  },
  statusCreated(user, supervisor, code, status, ticketId) {
    return `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <!-- NAME: 1 COLUMN -->
    <!--[if gte mso 15]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>*|MC:SUBJECT|*</title>

<style type="text/css">
p{
  margin:10px 0;
  padding:0;
}
table{
  border-collapse:collapse;
}
h1,h2,h3,h4,h5,h6{
  display:block;
  margin:0;
  padding:0;
}
img,a img{
  border:0;
  height:auto;
  outline:none;
  text-decoration:none;
}
body,#bodyTable,#bodyCell{
  height:100%;
  margin:0;
  padding:0;
  width:100%;
}
.mcnPreviewText{
  display:none !important;
}
#outlook a{
  padding:0;
}
img{
  -ms-interpolation-mode:bicubic;
}
table{
  mso-table-lspace:0pt;
  mso-table-rspace:0pt;
}
.ReadMsgBody{
  width:100%;
}
.ExternalClass{
  width:100%;
}
p,a,li,td,blockquote{
  mso-line-height-rule:exactly;
}
a[href^=tel],a[href^=sms]{
  color:inherit;
  cursor:default;
  text-decoration:none;
}
p,a,li,td,body,table,blockquote{
  -ms-text-size-adjust:100%;
  -webkit-text-size-adjust:100%;
}
.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
  line-height:100%;
}
a[x-apple-data-detectors]{
  color:inherit !important;
  text-decoration:none !important;
  font-size:inherit !important;
  font-family:inherit !important;
  font-weight:inherit !important;
  line-height:inherit !important;
}
#bodyCell{
  padding:10px;
}
.templateContainer{
  max-width:600px !important;
  border-collapse: collapse;
      border-radius: 16px;
    border-style: hidden !important;
    box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
}

a.mcnButton{
  display:block;
}
.mcnImage,.mcnRetinaImage{
  vertical-align:bottom;
}
.mcnTextContent{
  word-break:break-word;
}
.mcnTextContent img{
  height:auto !important;
}
.mcnDividerBlock{
  table-layout:fixed !important;
}
/*
@tab Page
@section Background Style
@tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
*/
body,#bodyTable{
  /*@editable*/background-color:#FAFAFA;
}
/*
@tab Page
@section Background Style
@tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
*/
#bodyCell{
  /*@editable*/border-top:0;
}
/*
@tab Page
@section Email Border
@tip Set the border for your email.
*/
.templateContainer{
  /*@editable*/border:0;
  box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
}
/*
@tab Page
@section Heading 1
@tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
@style heading 1
*/
h1{
  /*@editable*/color:#202020;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:26px;
  /*@editable*/font-style:normal;
  /*@editable*/font-weight:bold;
  /*@editable*/line-height:125%;
  /*@editable*/letter-spacing:normal;
  /*@editable*/text-align:left;
}
/*
@tab Page
@section Heading 2
@tip Set the styling for all second-level headings in your emails.
@style heading 2
*/
h2{
  /*@editable*/color:#202020;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:22px;
  /*@editable*/font-style:normal;
  /*@editable*/font-weight:bold;
  /*@editable*/line-height:125%;
  /*@editable*/letter-spacing:normal;
  /*@editable*/text-align:left;
}
/*
@tab Page
@section Heading 3
@tip Set the styling for all third-level headings in your emails.
@style heading 3
*/
h3{
  /*@editable*/color:#202020;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:20px;
  /*@editable*/font-style:normal;
  /*@editable*/font-weight:bold;
  /*@editable*/line-height:125%;
  /*@editable*/letter-spacing:normal;
  /*@editable*/text-align:left;
}
/*
@tab Page
@section Heading 4
@tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
@style heading 4
*/
h4{
  /*@editable*/color:#202020;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:18px;
  /*@editable*/font-style:normal;
  /*@editable*/font-weight:bold;
  /*@editable*/line-height:125%;
  /*@editable*/letter-spacing:normal;
  /*@editable*/text-align:left;
}
/*
@tab Preheader
@section Preheader Style
@tip Set the background color and borders for your email's preheader area.
*/
#templatePreheader{
  /*@editable*/background-color:#FAFAFA;
  /*@editable*/background-image:none;
  /*@editable*/background-repeat:no-repeat;
  /*@editable*/background-position:center;
  /*@editable*/background-size:cover;
  /*@editable*/border-top:0;
  /*@editable*/border-bottom:0;
  /*@editable*/padding-top:9px;
  /*@editable*/padding-bottom:9px;
}
/*
@tab Preheader
@section Preheader Text
@tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
*/
#templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
  /*@editable*/color:#656565;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:12px;
  /*@editable*/line-height:150%;
  /*@editable*/text-align:left;
}
/*
@tab Preheader
@section Preheader Link
@tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
*/
#templatePreheader .mcnTextContent a,#templatePreheader .mcnTextContent p a{
  /*@editable*/color:#656565;
  /*@editable*/font-weight:normal;
  /*@editable*/text-decoration:underline;
}
/*
@tab Header
@section Header Style
@tip Set the background color and borders for your email's header area.
*/
#templateHeader{
  background-color: initial;
  /*@editable*/background-image:none;
  /*@editable*/background-repeat:no-repeat;
  /*@editable*/background-position:center;
  /*@editable*/background-size:cover;
  /*@editable*/border-top:0;
  /*@editable*/border-bottom:0;
  /*@editable*/padding-top:9px;
  /*@editable*/padding-bottom:0;
}
/*
@tab Header
@section Header Text
@tip Set the styling for your email's header text. Choose a size and color that is easy to read.
*/
#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
  /*@editable*/color:#202020;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:16px;
  /*@editable*/line-height:150%;
  /*@editable*/text-align:left;
}
/*
@tab Header
@section Header Link
@tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
*/
#templateHeader .mcnTextContent a,#templateHeader .mcnTextContent p a{
  /*@editable*/color:#007C89;
  /*@editable*/font-weight:normal;
  /*@editable*/text-decoration:underline;
}
/*
@tab Body
@section Body Style
@tip Set the background color and borders for your email's body area.
*/
#templateBody{
  background-color: initial !important;
  /*@editable*/background-image:none;
  /*@editable*/background-repeat:no-repeat;
  /*@editable*/background-position:center;
  /*@editable*/background-size:cover;
  /*@editable*/border-top:0;
  /*@editable*/border-bottom:2px solid #EAEAEA;
  /*@editable*/padding-top:0;
  /*@editable*/padding-bottom:0;
}
/*
@tab Body
@section Body Text
@tip Set the styling for your email's body text. Choose a size and color that is easy to read.
*/
#templateBody .mcnTextContent,#templateBody .mcnTextContent p{
  /*@editable*/color:#202020;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:16px;
  /*@editable*/line-height:150%;
  /*@editable*/text-align:left;
}
/*
@tab Body
@section Body Link
@tip Set the styling for your email's body links. Choose a color that helps them stand out from your text.
*/
#templateBody .mcnTextContent a,#templateBody .mcnTextContent p a{
  /*@editable*/color:#007C89;
  /*@editable*/font-weight:normal;
  /*@editable*/text-decoration:underline;
}
/*
@tab Footer
@section Footer Style
@tip Set the background color and borders for your email's footer area.
*/
#templateFooter{
  /*@editable*/background-color:#FAFAFA;
  /*@editable*/background-image:none;
  /*@editable*/background-repeat:no-repeat;
  /*@editable*/background-position:center;
  /*@editable*/background-size:cover;
  /*@editable*/border-top:0;
  /*@editable*/border-bottom:0;
  /*@editable*/padding-top:9px;
  /*@editable*/padding-bottom:9px;
}
/*
@tab Footer
@section Footer Text
@tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
*/
#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
  /*@editable*/color:#656565;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:12px;
  /*@editable*/line-height:150%;
  /*@editable*/text-align:center;
}
/*
@tab Footer
@section Footer Link
@tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
*/
#templateFooter .mcnTextContent a,#templateFooter .mcnTextContent p a{
  /*@editable*/color:#656565;
  /*@editable*/font-weight:normal;
  /*@editable*/text-decoration:underline;
}
@media only screen and (min-width:768px){
.templateContainer{
  width:600px !important;
}

}	@media only screen and (max-width: 480px){
body,table,td,p,a,li,blockquote{
  -webkit-text-size-adjust:none !important;
}

}	@media only screen and (max-width: 480px){
body{
  width:100% !important;
  min-width:100% !important;
}

}	@media only screen and (max-width: 480px){
.mcnRetinaImage{
  max-width:100% !important;
}

}	@media only screen and (max-width: 480px){
.mcnImage{
  width:100% !important;
}

}	@media only screen and (max-width: 480px){
.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
  max-width:100% !important;
  width:100% !important;
}

}	@media only screen and (max-width: 480px){
.mcnBoxedTextContentContainer{
  min-width:100% !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageGroupContent{
  padding:9px !important;
}

}	@media only screen and (max-width: 480px){
.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
  padding-top:9px !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
  padding-top:18px !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageCardBottomImageContent{
  padding-bottom:9px !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageGroupBlockInner{
  padding-top:0 !important;
  padding-bottom:0 !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageGroupBlockOuter{
  padding-top:9px !important;
  padding-bottom:9px !important;
}

}	@media only screen and (max-width: 480px){
.mcnTextContent,.mcnBoxedTextContentColumn{
  padding-right:18px !important;
  padding-left:18px !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
  padding-right:18px !important;
  padding-bottom:0 !important;
  padding-left:18px !important;
}

}	@media only screen and (max-width: 480px){
.mcpreview-image-uploader{
  display:none !important;
  width:100% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Heading 1
@tip Make the first-level headings larger in size for better readability on small screens.
*/
h1{
  /*@editable*/font-size:22px !important;
  /*@editable*/line-height:125% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Heading 2
@tip Make the second-level headings larger in size for better readability on small screens.
*/
h2{
  /*@editable*/font-size:20px !important;
  /*@editable*/line-height:125% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Heading 3
@tip Make the third-level headings larger in size for better readability on small screens.
*/
h3{
  /*@editable*/font-size:18px !important;
  /*@editable*/line-height:125% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Heading 4
@tip Make the fourth-level headings larger in size for better readability on small screens.
*/
h4{
  /*@editable*/font-size:16px !important;
  /*@editable*/line-height:150% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Boxed Text
@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
*/
.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
  /*@editable*/font-size:14px !important;
  /*@editable*/line-height:150% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Preheader Visibility
@tip Set the visibility of the email's preheader on small screens. You can hide it to save space.
*/
#templatePreheader{
  /*@editable*/display:block !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Preheader Text
@tip Make the preheader text larger in size for better readability on small screens.
*/
#templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
  /*@editable*/font-size:14px !important;
  /*@editable*/line-height:150% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Header Text
@tip Make the header text larger in size for better readability on small screens.
*/
#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
  /*@editable*/font-size:16px !important;
  /*@editable*/line-height:150% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Body Text
@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
*/
#templateBody .mcnTextContent,#templateBody .mcnTextContent p{
  /*@editable*/font-size:16px !important;
  /*@editable*/line-height:150% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Footer Text
@tip Make the footer content text larger in size for better readability on small screens.
*/
#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
  /*@editable*/font-size:14px !important;
  /*@editable*/line-height:150% !important;
}

}</style></head>
<body>
    <center>
        <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
            <tr>
                <td align="center" valign="top" id="bodyCell">
                    <!-- BEGIN TEMPLATE // -->
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                    <tr>
                    <td align="center" valign="top" width="600" style="width:600px;">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="max-width: 600px !important;">

                        <tr>
                            <td valign="top" id="templateHeader"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
<tbody class="mcnImageBlockOuter">
        <tr>
            <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                    <tbody><tr>
                        <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">


                                    <img align="center" alt="" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/cb932210-f8ff-ef26-fe34-0f06df8a8519.png" width="279" style="max-width:279px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage">


                        </td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
</tbody>
</table></td>
                        </tr>
                        <tr>
                            <td valign="top" id="templateBody"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
<tbody class="mcnDividerBlockOuter">
    <tr>
        <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
            <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #EAEAEA;">
                <tbody><tr>
                    <td>
                        <span></span>
                    </td>
                </tr>
            </tbody></table>
<!--
            <td class="mcnDividerBlockInner" style="padding: 18px;">
            <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
-->
        </td>
    </tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
<tbody class="mcnTextBlockOuter">
    <tr>
        <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
            <!--[if mso]>
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
    <tr>
    <![endif]-->

    <!--[if mso]>
    <td valign="top" width="600" style="width:600px;">
    <![endif]-->
            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                <tbody><tr>

                    <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

                        <h1 style="text-align: center;"><span style="font-size:14px"><span style="font-family:verdana,geneva,sans-serif"><strong>Hola, ${user}</strong></span></span></h1>

<div style="text-align: center;"><span style="font-size:12px"><span style="font-family:verdana,geneva,sans-serif">Se ha creado su solicitud <b>#${code}</b> en Ventana Menorca. Uno de nuestros(as) ejecutivos(as) la atenderá a la brevedad posible.</span></span></div>

                    </td>
                </tr>
            </tbody></table>
    <!--[if mso]>
    </td>
    <![endif]-->

    <!--[if mso]>
    </tr>
    </table>
    <![endif]-->
        </td>
    </tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock" style="min-width:100%;">
<!--[if gte mso 9]>
<table align="center" border="0" cellspacing="0" cellpadding="0" width="100%">
<![endif]-->
<tbody class="mcnBoxedTextBlockOuter">
    <tr>
        <td valign="top" class="mcnBoxedTextBlockInner">

    <!--[if gte mso 9]>
    <td align="center" valign="top" ">
    <![endif]-->
    <!--[if gte mso 9]>
    </td>
    <![endif]-->

    <!--[if gte mso 9]>
            </tr>
            </table>
    <![endif]-->
        </td>
    </tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock" style="min-width:100%;background-color: #ECF9F1;">
<tbody class="mcnButtonBlockOuter">
    <tr>
        <td style="padding-top:18px; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
            <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 35px;background-color: #158C30;padding: 3px 90px;">
                <tbody>
                    <tr>
                        <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial; font-size: 16px; padding: 18px;">
                            <a href="https://proyectos.picnic.pe/menorca/ventana/atencion-al-cliente/detalle/${ticketId}" class="mcnButton " title="Ver solicitud" href="" target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">Ver solicitud</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </td>
    </tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
<tbody class="mcnTextBlockOuter">
    <tr>
        <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
            <!--[if mso]>
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
    <tr>
    <![endif]-->

    <!--[if mso]>
    <td valign="top" width="600" style="width:600px;">
    <![endif]-->
            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                <tbody><tr>

                    <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

                        <div style="text-align: center;"><span style="font-family:verdana,geneva,sans-serif"><span style="font-size:12px">Atentamente,<br>
Ventana Menorca</span></span></div>

                    </td>
                </tr>
            </tbody></table>
    <!--[if mso]>
    </td>
    <![endif]-->

    <!--[if mso]>
    </tr>
    </table>
    <![endif]-->
        </td>
    </tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;background: #F5F5F5;">
<tbody class="mcnTextBlockOuter">
    <tr>
        <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
            <!--[if mso]>
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
    <tr>
    <![endif]-->

    <!--[if mso]>
    <td valign="top" width="300" style="width:300px;">
    <![endif]-->
            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:300px;" width="100%" class="mcnTextContentContainer">
                <tbody><tr>

                    <td valign="top" class="mcnTextContent" style="padding-top:0; padding-left:18px; padding-bottom:9px; padding-right:18px;">

                        <img data-file-id="5913809" height="39" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/a918743d-e512-7d2f-7593-f9de280fb9bc.png" style="border: 0px  ; width: 60px; height: 39px; margin: 0px;" width="60">
                    </td>
                </tr>
            </tbody></table>
    <!--[if mso]>
    </td>
    <![endif]-->

    <!--[if mso]>
    <td valign="top" width="300" style="width:300px;">
    <![endif]-->
            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:300px;" width="100%" class="mcnTextContentContainer">
                <tbody><tr>

                    <td valign="top" class="mcnTextContent" style="padding-top:0; padding-left:18px; padding-bottom:9px; padding-right:18px;">

                        <div style="float:right;text-align:right;padding: 14px 0 0;">
                          <a href="https://instagram.com/menorcainversiones?igshid=10cetn29cdmvu" target="_blank"><img data-file-id="5913821" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/56759879-13ae-e122-c7cc-65e9c3fe710d.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                          <a href="https://www.facebook.com/menorcalotes" target="_blank"><img data-file-id="5913825" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/48690c0a-d09f-4380-86da-cb88dec0c82d.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                          <a href="https://tiktok.com/@menorcainversiones" target="_blank"><img data-file-id="5913817" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/1eea6d59-7251-f0c6-d657-2a157d2fc52e.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                          <a href="https://pe.linkedin.com/company/menorca-inversiones-s-a-c" target="_blank"><img data-file-id="5913813" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/2346c5ce-2cdd-fa62-7893-7f38700ba837.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>
                        </div>

                    </td>
                </tr>
            </tbody></table>
    <!--[if mso]>
    </td>
    <![endif]-->

    <!--[if mso]>
    </tr>
    </table>
    <![endif]-->
        </td>
    </tr>
</tbody>
</table></td>
                        </tr>

                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                    <!-- // END TEMPLATE -->
                </td>
            </tr>
        </table>
    </center>
<script type="text/javascript"  src="/PxtHz/uB/J/1/CvUJv9EyAQ4/b55fLcDLEwiV/Ay4KP0QVAw/DjxY/PBkpEjE"></script></body>
</html>
`;
  },
  statusCreatedToMenorca(user, text) {
    return `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <!-- NAME: 1 COLUMN -->
    <!--[if gte mso 15]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>*|MC:SUBJECT|*</title>

<style type="text/css">
p{
  margin:10px 0;
  padding:0;
}
table{
  border-collapse:collapse;
}
h1,h2,h3,h4,h5,h6{
  display:block;
  margin:0;
  padding:0;
}
img,a img{
  border:0;
  height:auto;
  outline:none;
  text-decoration:none;
}
body,#bodyTable,#bodyCell{
  height:100%;
  margin:0;
  padding:0;
  width:100%;
}
.mcnPreviewText{
  display:none !important;
}
#outlook a{
  padding:0;
}
img{
  -ms-interpolation-mode:bicubic;
}
table{
  mso-table-lspace:0pt;
  mso-table-rspace:0pt;
}
.ReadMsgBody{
  width:100%;
}
.ExternalClass{
  width:100%;
}
p,a,li,td,blockquote{
  mso-line-height-rule:exactly;
}
a[href^=tel],a[href^=sms]{
  color:inherit;
  cursor:default;
  text-decoration:none;
}
p,a,li,td,body,table,blockquote{
  -ms-text-size-adjust:100%;
  -webkit-text-size-adjust:100%;
}
.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
  line-height:100%;
}
a[x-apple-data-detectors]{
  color:inherit !important;
  text-decoration:none !important;
  font-size:inherit !important;
  font-family:inherit !important;
  font-weight:inherit !important;
  line-height:inherit !important;
}
#bodyCell{
  padding:10px;
}
.templateContainer{
  max-width:600px !important;
  border-collapse: collapse;
      border-radius: 16px;
    border-style: hidden !important;
    box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
}

a.mcnButton{
  display:block;
}
.mcnImage,.mcnRetinaImage{
  vertical-align:bottom;
}
.mcnTextContent{
  word-break:break-word;
}
.mcnTextContent img{
  height:auto !important;
}
.mcnDividerBlock{
  table-layout:fixed !important;
}
/*
@tab Page
@section Background Style
@tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
*/
body,#bodyTable{
  /*@editable*/background-color:#FAFAFA;
}
/*
@tab Page
@section Background Style
@tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
*/
#bodyCell{
  /*@editable*/border-top:0;
}
/*
@tab Page
@section Email Border
@tip Set the border for your email.
*/
.templateContainer{
  /*@editable*/border:0;
  box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
}
/*
@tab Page
@section Heading 1
@tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
@style heading 1
*/
h1{
  /*@editable*/color:#202020;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:26px;
  /*@editable*/font-style:normal;
  /*@editable*/font-weight:bold;
  /*@editable*/line-height:125%;
  /*@editable*/letter-spacing:normal;
  /*@editable*/text-align:left;
}
/*
@tab Page
@section Heading 2
@tip Set the styling for all second-level headings in your emails.
@style heading 2
*/
h2{
  /*@editable*/color:#202020;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:22px;
  /*@editable*/font-style:normal;
  /*@editable*/font-weight:bold;
  /*@editable*/line-height:125%;
  /*@editable*/letter-spacing:normal;
  /*@editable*/text-align:left;
}
/*
@tab Page
@section Heading 3
@tip Set the styling for all third-level headings in your emails.
@style heading 3
*/
h3{
  /*@editable*/color:#202020;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:20px;
  /*@editable*/font-style:normal;
  /*@editable*/font-weight:bold;
  /*@editable*/line-height:125%;
  /*@editable*/letter-spacing:normal;
  /*@editable*/text-align:left;
}
/*
@tab Page
@section Heading 4
@tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
@style heading 4
*/
h4{
  /*@editable*/color:#202020;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:18px;
  /*@editable*/font-style:normal;
  /*@editable*/font-weight:bold;
  /*@editable*/line-height:125%;
  /*@editable*/letter-spacing:normal;
  /*@editable*/text-align:left;
}
/*
@tab Preheader
@section Preheader Style
@tip Set the background color and borders for your email's preheader area.
*/
#templatePreheader{
  /*@editable*/background-color:#FAFAFA;
  /*@editable*/background-image:none;
  /*@editable*/background-repeat:no-repeat;
  /*@editable*/background-position:center;
  /*@editable*/background-size:cover;
  /*@editable*/border-top:0;
  /*@editable*/border-bottom:0;
  /*@editable*/padding-top:9px;
  /*@editable*/padding-bottom:9px;
}
/*
@tab Preheader
@section Preheader Text
@tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
*/
#templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
  /*@editable*/color:#656565;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:12px;
  /*@editable*/line-height:150%;
  /*@editable*/text-align:left;
}
/*
@tab Preheader
@section Preheader Link
@tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
*/
#templatePreheader .mcnTextContent a,#templatePreheader .mcnTextContent p a{
  /*@editable*/color:#656565;
  /*@editable*/font-weight:normal;
  /*@editable*/text-decoration:underline;
}
/*
@tab Header
@section Header Style
@tip Set the background color and borders for your email's header area.
*/
#templateHeader{
  background-color: initial;
  /*@editable*/background-image:none;
  /*@editable*/background-repeat:no-repeat;
  /*@editable*/background-position:center;
  /*@editable*/background-size:cover;
  /*@editable*/border-top:0;
  /*@editable*/border-bottom:0;
  /*@editable*/padding-top:9px;
  /*@editable*/padding-bottom:0;
}
/*
@tab Header
@section Header Text
@tip Set the styling for your email's header text. Choose a size and color that is easy to read.
*/
#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
  /*@editable*/color:#202020;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:16px;
  /*@editable*/line-height:150%;
  /*@editable*/text-align:left;
}
/*
@tab Header
@section Header Link
@tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
*/
#templateHeader .mcnTextContent a,#templateHeader .mcnTextContent p a{
  /*@editable*/color:#007C89;
  /*@editable*/font-weight:normal;
  /*@editable*/text-decoration:underline;
}
/*
@tab Body
@section Body Style
@tip Set the background color and borders for your email's body area.
*/
#templateBody{
  background-color: initial !important;
  /*@editable*/background-image:none;
  /*@editable*/background-repeat:no-repeat;
  /*@editable*/background-position:center;
  /*@editable*/background-size:cover;
  /*@editable*/border-top:0;
  /*@editable*/border-bottom:2px solid #EAEAEA;
  /*@editable*/padding-top:0;
  /*@editable*/padding-bottom:0;
}
/*
@tab Body
@section Body Text
@tip Set the styling for your email's body text. Choose a size and color that is easy to read.
*/
#templateBody .mcnTextContent,#templateBody .mcnTextContent p{
  /*@editable*/color:#202020;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:16px;
  /*@editable*/line-height:150%;
  /*@editable*/text-align:left;
}
/*
@tab Body
@section Body Link
@tip Set the styling for your email's body links. Choose a color that helps them stand out from your text.
*/
#templateBody .mcnTextContent a,#templateBody .mcnTextContent p a{
  /*@editable*/color:#007C89;
  /*@editable*/font-weight:normal;
  /*@editable*/text-decoration:underline;
}
/*
@tab Footer
@section Footer Style
@tip Set the background color and borders for your email's footer area.
*/
#templateFooter{
  /*@editable*/background-color:#FAFAFA;
  /*@editable*/background-image:none;
  /*@editable*/background-repeat:no-repeat;
  /*@editable*/background-position:center;
  /*@editable*/background-size:cover;
  /*@editable*/border-top:0;
  /*@editable*/border-bottom:0;
  /*@editable*/padding-top:9px;
  /*@editable*/padding-bottom:9px;
}
/*
@tab Footer
@section Footer Text
@tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
*/
#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
  /*@editable*/color:#656565;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:12px;
  /*@editable*/line-height:150%;
  /*@editable*/text-align:center;
}
/*
@tab Footer
@section Footer Link
@tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
*/
#templateFooter .mcnTextContent a,#templateFooter .mcnTextContent p a{
  /*@editable*/color:#656565;
  /*@editable*/font-weight:normal;
  /*@editable*/text-decoration:underline;
}
@media only screen and (min-width:768px){
.templateContainer{
  width:600px !important;
}

}	@media only screen and (max-width: 480px){
body,table,td,p,a,li,blockquote{
  -webkit-text-size-adjust:none !important;
}

}	@media only screen and (max-width: 480px){
body{
  width:100% !important;
  min-width:100% !important;
}

}	@media only screen and (max-width: 480px){
.mcnRetinaImage{
  max-width:100% !important;
}

}	@media only screen and (max-width: 480px){
.mcnImage{
  width:100% !important;
}

}	@media only screen and (max-width: 480px){
.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
  max-width:100% !important;
  width:100% !important;
}

}	@media only screen and (max-width: 480px){
.mcnBoxedTextContentContainer{
  min-width:100% !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageGroupContent{
  padding:9px !important;
}

}	@media only screen and (max-width: 480px){
.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
  padding-top:9px !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
  padding-top:18px !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageCardBottomImageContent{
  padding-bottom:9px !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageGroupBlockInner{
  padding-top:0 !important;
  padding-bottom:0 !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageGroupBlockOuter{
  padding-top:9px !important;
  padding-bottom:9px !important;
}

}	@media only screen and (max-width: 480px){
.mcnTextContent,.mcnBoxedTextContentColumn{
  padding-right:18px !important;
  padding-left:18px !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
  padding-right:18px !important;
  padding-bottom:0 !important;
  padding-left:18px !important;
}

}	@media only screen and (max-width: 480px){
.mcpreview-image-uploader{
  display:none !important;
  width:100% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Heading 1
@tip Make the first-level headings larger in size for better readability on small screens.
*/
h1{
  /*@editable*/font-size:22px !important;
  /*@editable*/line-height:125% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Heading 2
@tip Make the second-level headings larger in size for better readability on small screens.
*/
h2{
  /*@editable*/font-size:20px !important;
  /*@editable*/line-height:125% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Heading 3
@tip Make the third-level headings larger in size for better readability on small screens.
*/
h3{
  /*@editable*/font-size:18px !important;
  /*@editable*/line-height:125% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Heading 4
@tip Make the fourth-level headings larger in size for better readability on small screens.
*/
h4{
  /*@editable*/font-size:16px !important;
  /*@editable*/line-height:150% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Boxed Text
@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
*/
.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
  /*@editable*/font-size:14px !important;
  /*@editable*/line-height:150% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Preheader Visibility
@tip Set the visibility of the email's preheader on small screens. You can hide it to save space.
*/
#templatePreheader{
  /*@editable*/display:block !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Preheader Text
@tip Make the preheader text larger in size for better readability on small screens.
*/
#templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
  /*@editable*/font-size:14px !important;
  /*@editable*/line-height:150% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Header Text
@tip Make the header text larger in size for better readability on small screens.
*/
#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
  /*@editable*/font-size:16px !important;
  /*@editable*/line-height:150% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Body Text
@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
*/
#templateBody .mcnTextContent,#templateBody .mcnTextContent p{
  /*@editable*/font-size:16px !important;
  /*@editable*/line-height:150% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Footer Text
@tip Make the footer content text larger in size for better readability on small screens.
*/
#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
  /*@editable*/font-size:14px !important;
  /*@editable*/line-height:150% !important;
}

}</style></head>
<body>
    <center>
        <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
            <tr>
                <td align="center" valign="top" id="bodyCell">
                    <!-- BEGIN TEMPLATE // -->
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                    <tr>
                    <td align="center" valign="top" width="600" style="width:600px;">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="max-width: 600px !important;">

                        <tr>
                            <td valign="top" id="templateHeader"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
<tbody class="mcnImageBlockOuter">
        <tr>
            <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                    <tbody><tr>
                        <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">


                                    <img align="center" alt="" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/cb932210-f8ff-ef26-fe34-0f06df8a8519.png" width="279" style="max-width:279px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage">


                        </td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
</tbody>
</table></td>
                        </tr>
                        <tr>
                            <td valign="top" id="templateBody"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
<tbody class="mcnDividerBlockOuter">
    <tr>
        <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
            <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #EAEAEA;">
                <tbody><tr>
                    <td>
                        <span></span>
                    </td>
                </tr>
            </tbody></table>
<!--
            <td class="mcnDividerBlockInner" style="padding: 18px;">
            <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
-->
        </td>
    </tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
<tbody class="mcnTextBlockOuter">
    <tr>
        <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
            <!--[if mso]>
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
    <tr>
    <![endif]-->

    <!--[if mso]>
    <td valign="top" width="600" style="width:600px;">
    <![endif]-->
            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                <tbody><tr>

                    <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

<div style="text-align: center;"><span style="font-size:12px"><span style="font-family:verdana,geneva,sans-serif">${text}</span></span></div>

                    </td>
                </tr>
            </tbody></table>
    <!--[if mso]>
    </td>
    <![endif]-->

    <!--[if mso]>
    </tr>
    </table>
    <![endif]-->
        </td>
    </tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock" style="min-width:100%;">
<!--[if gte mso 9]>
<table align="center" border="0" cellspacing="0" cellpadding="0" width="100%">
<![endif]-->
<tbody class="mcnBoxedTextBlockOuter">
    <tr>
        <td valign="top" class="mcnBoxedTextBlockInner">

    <!--[if gte mso 9]>
    <td align="center" valign="top" ">
    <![endif]-->
    <!--[if gte mso 9]>
    </td>
    <![endif]-->

    <!--[if gte mso 9]>
            </tr>
            </table>
    <![endif]-->
        </td>
    </tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
<tbody class="mcnTextBlockOuter">
    <tr>
        <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
            <!--[if mso]>
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
    <tr>
    <![endif]-->

    <!--[if mso]>
    <td valign="top" width="600" style="width:600px;">
    <![endif]-->
            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                <tbody><tr>

                    <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

                        <div style="text-align: center;"><span style="font-family:verdana,geneva,sans-serif"><span style="font-size:12px">Atentamente,<br>
Ventana Menorca</span></span></div>

                    </td>
                </tr>
            </tbody></table>
    <!--[if mso]>
    </td>
    <![endif]-->

    <!--[if mso]>
    </tr>
    </table>
    <![endif]-->
        </td>
    </tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;background: #F5F5F5;">
<tbody class="mcnTextBlockOuter">
    <tr>
        <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
            <!--[if mso]>
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
    <tr>
    <![endif]-->

    <!--[if mso]>
    <td valign="top" width="300" style="width:300px;">
    <![endif]-->
            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:300px;" width="100%" class="mcnTextContentContainer">
                <tbody><tr>

                    <td valign="top" class="mcnTextContent" style="padding-top:0; padding-left:18px; padding-bottom:9px; padding-right:18px;">

                        <img data-file-id="5913809" height="39" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/a918743d-e512-7d2f-7593-f9de280fb9bc.png" style="border: 0px  ; width: 60px; height: 39px; margin: 0px;" width="60">
                    </td>
                </tr>
            </tbody></table>
    <!--[if mso]>
    </td>
    <![endif]-->

    <!--[if mso]>
    <td valign="top" width="300" style="width:300px;">
    <![endif]-->
            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:300px;" width="100%" class="mcnTextContentContainer">
                <tbody><tr>

                    <td valign="top" class="mcnTextContent" style="padding-top:0; padding-left:18px; padding-bottom:9px; padding-right:18px;">

                        <div style="float:right;text-align:right;padding: 14px 0 0;">
                          <a href="https://instagram.com/menorcainversiones?igshid=10cetn29cdmvu" target="_blank"><img data-file-id="5913821" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/56759879-13ae-e122-c7cc-65e9c3fe710d.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                          <a href="https://www.facebook.com/menorcalotes" target="_blank"><img data-file-id="5913825" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/48690c0a-d09f-4380-86da-cb88dec0c82d.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                          <a href="https://tiktok.com/@menorcainversiones" target="_blank"><img data-file-id="5913817" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/1eea6d59-7251-f0c6-d657-2a157d2fc52e.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                          <a href="https://pe.linkedin.com/company/menorca-inversiones-s-a-c" target="_blank"><img data-file-id="5913813" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/2346c5ce-2cdd-fa62-7893-7f38700ba837.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>
                        </div>

                    </td>
                </tr>
            </tbody></table>
    <!--[if mso]>
    </td>
    <![endif]-->

    <!--[if mso]>
    </tr>
    </table>
    <![endif]-->
        </td>
    </tr>
</tbody>
</table></td>
                        </tr>

                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                    <!-- // END TEMPLATE -->
                </td>
            </tr>
        </table>
    </center>
<script type="text/javascript"  src="/PxtHz/uB/J/1/CvUJv9EyAQ4/b55fLcDLEwiV/Ay4KP0QVAw/DjxY/PBkpEjE"></script></body>
</html>
`;
  },
  quoteRequest(user) {
    return `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <!-- NAME: 1 COLUMN -->
    <!--[if gte mso 15]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>*|MC:SUBJECT|*</title>

<style type="text/css">
p{
  margin:10px 0;
  padding:0;
}
table{
  border-collapse:collapse;
}
h1,h2,h3,h4,h5,h6{
  display:block;
  margin:0;
  padding:0;
}
img,a img{
  border:0;
  height:auto;
  outline:none;
  text-decoration:none;
}
body,#bodyTable,#bodyCell{
  height:100%;
  margin:0;
  padding:0;
  width:100%;
}
.mcnPreviewText{
  display:none !important;
}
#outlook a{
  padding:0;
}
img{
  -ms-interpolation-mode:bicubic;
}
table{
  mso-table-lspace:0pt;
  mso-table-rspace:0pt;
}
.ReadMsgBody{
  width:100%;
}
.ExternalClass{
  width:100%;
}
p,a,li,td,blockquote{
  mso-line-height-rule:exactly;
}
a[href^=tel],a[href^=sms]{
  color:inherit;
  cursor:default;
  text-decoration:none;
}
p,a,li,td,body,table,blockquote{
  -ms-text-size-adjust:100%;
  -webkit-text-size-adjust:100%;
}
.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
  line-height:100%;
}
a[x-apple-data-detectors]{
  color:inherit !important;
  text-decoration:none !important;
  font-size:inherit !important;
  font-family:inherit !important;
  font-weight:inherit !important;
  line-height:inherit !important;
}
#bodyCell{
  padding:10px;
}
.templateContainer{
  max-width:600px !important;
  border-collapse: collapse;
      border-radius: 16px;
    border-style: hidden !important;
    box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
}

a.mcnButton{
  display:block;
}
.mcnImage,.mcnRetinaImage{
  vertical-align:bottom;
}
.mcnTextContent{
  word-break:break-word;
}
.mcnTextContent img{
  height:auto !important;
}
.mcnDividerBlock{
  table-layout:fixed !important;
}
/*
@tab Page
@section Background Style
@tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
*/
body,#bodyTable{
  /*@editable*/background-color:#FAFAFA;
}
/*
@tab Page
@section Background Style
@tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
*/
#bodyCell{
  /*@editable*/border-top:0;
}
/*
@tab Page
@section Email Border
@tip Set the border for your email.
*/
.templateContainer{
  /*@editable*/border:0;
  box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
}
/*
@tab Page
@section Heading 1
@tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
@style heading 1
*/
h1{
  /*@editable*/color:#202020;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:26px;
  /*@editable*/font-style:normal;
  /*@editable*/font-weight:bold;
  /*@editable*/line-height:125%;
  /*@editable*/letter-spacing:normal;
  /*@editable*/text-align:left;
}
/*
@tab Page
@section Heading 2
@tip Set the styling for all second-level headings in your emails.
@style heading 2
*/
h2{
  /*@editable*/color:#202020;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:22px;
  /*@editable*/font-style:normal;
  /*@editable*/font-weight:bold;
  /*@editable*/line-height:125%;
  /*@editable*/letter-spacing:normal;
  /*@editable*/text-align:left;
}
/*
@tab Page
@section Heading 3
@tip Set the styling for all third-level headings in your emails.
@style heading 3
*/
h3{
  /*@editable*/color:#202020;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:20px;
  /*@editable*/font-style:normal;
  /*@editable*/font-weight:bold;
  /*@editable*/line-height:125%;
  /*@editable*/letter-spacing:normal;
  /*@editable*/text-align:left;
}
/*
@tab Page
@section Heading 4
@tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
@style heading 4
*/
h4{
  /*@editable*/color:#202020;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:18px;
  /*@editable*/font-style:normal;
  /*@editable*/font-weight:bold;
  /*@editable*/line-height:125%;
  /*@editable*/letter-spacing:normal;
  /*@editable*/text-align:left;
}
/*
@tab Preheader
@section Preheader Style
@tip Set the background color and borders for your email's preheader area.
*/
#templatePreheader{
  /*@editable*/background-color:#FAFAFA;
  /*@editable*/background-image:none;
  /*@editable*/background-repeat:no-repeat;
  /*@editable*/background-position:center;
  /*@editable*/background-size:cover;
  /*@editable*/border-top:0;
  /*@editable*/border-bottom:0;
  /*@editable*/padding-top:9px;
  /*@editable*/padding-bottom:9px;
}
/*
@tab Preheader
@section Preheader Text
@tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
*/
#templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
  /*@editable*/color:#656565;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:12px;
  /*@editable*/line-height:150%;
  /*@editable*/text-align:left;
}
/*
@tab Preheader
@section Preheader Link
@tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
*/
#templatePreheader .mcnTextContent a,#templatePreheader .mcnTextContent p a{
  /*@editable*/color:#656565;
  /*@editable*/font-weight:normal;
  /*@editable*/text-decoration:underline;
}
/*
@tab Header
@section Header Style
@tip Set the background color and borders for your email's header area.
*/
#templateHeader{
  background-color: initial;
  /*@editable*/background-image:none;
  /*@editable*/background-repeat:no-repeat;
  /*@editable*/background-position:center;
  /*@editable*/background-size:cover;
  /*@editable*/border-top:0;
  /*@editable*/border-bottom:0;
  /*@editable*/padding-top:9px;
  /*@editable*/padding-bottom:0;
}
/*
@tab Header
@section Header Text
@tip Set the styling for your email's header text. Choose a size and color that is easy to read.
*/
#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
  /*@editable*/color:#202020;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:16px;
  /*@editable*/line-height:150%;
  /*@editable*/text-align:left;
}
/*
@tab Header
@section Header Link
@tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
*/
#templateHeader .mcnTextContent a,#templateHeader .mcnTextContent p a{
  /*@editable*/color:#007C89;
  /*@editable*/font-weight:normal;
  /*@editable*/text-decoration:underline;
}
/*
@tab Body
@section Body Style
@tip Set the background color and borders for your email's body area.
*/
#templateBody{
  background-color: initial !important;
  /*@editable*/background-image:none;
  /*@editable*/background-repeat:no-repeat;
  /*@editable*/background-position:center;
  /*@editable*/background-size:cover;
  /*@editable*/border-top:0;
  /*@editable*/border-bottom:2px solid #EAEAEA;
  /*@editable*/padding-top:0;
  /*@editable*/padding-bottom:0;
}
/*
@tab Body
@section Body Text
@tip Set the styling for your email's body text. Choose a size and color that is easy to read.
*/
#templateBody .mcnTextContent,#templateBody .mcnTextContent p{
  /*@editable*/color:#202020;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:16px;
  /*@editable*/line-height:150%;
  /*@editable*/text-align:left;
}
/*
@tab Body
@section Body Link
@tip Set the styling for your email's body links. Choose a color that helps them stand out from your text.
*/
#templateBody .mcnTextContent a,#templateBody .mcnTextContent p a{
  /*@editable*/color:#007C89;
  /*@editable*/font-weight:normal;
  /*@editable*/text-decoration:underline;
}
/*
@tab Footer
@section Footer Style
@tip Set the background color and borders for your email's footer area.
*/
#templateFooter{
  /*@editable*/background-color:#FAFAFA;
  /*@editable*/background-image:none;
  /*@editable*/background-repeat:no-repeat;
  /*@editable*/background-position:center;
  /*@editable*/background-size:cover;
  /*@editable*/border-top:0;
  /*@editable*/border-bottom:0;
  /*@editable*/padding-top:9px;
  /*@editable*/padding-bottom:9px;
}
/*
@tab Footer
@section Footer Text
@tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
*/
#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
  /*@editable*/color:#656565;
  /*@editable*/font-family:Helvetica;
  /*@editable*/font-size:12px;
  /*@editable*/line-height:150%;
  /*@editable*/text-align:center;
}
/*
@tab Footer
@section Footer Link
@tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
*/
#templateFooter .mcnTextContent a,#templateFooter .mcnTextContent p a{
  /*@editable*/color:#656565;
  /*@editable*/font-weight:normal;
  /*@editable*/text-decoration:underline;
}
@media only screen and (min-width:768px){
.templateContainer{
  width:600px !important;
}

}	@media only screen and (max-width: 480px){
body,table,td,p,a,li,blockquote{
  -webkit-text-size-adjust:none !important;
}

}	@media only screen and (max-width: 480px){
body{
  width:100% !important;
  min-width:100% !important;
}

}	@media only screen and (max-width: 480px){
.mcnRetinaImage{
  max-width:100% !important;
}

}	@media only screen and (max-width: 480px){
.mcnImage{
  width:100% !important;
}

}	@media only screen and (max-width: 480px){
.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
  max-width:100% !important;
  width:100% !important;
}

}	@media only screen and (max-width: 480px){
.mcnBoxedTextContentContainer{
  min-width:100% !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageGroupContent{
  padding:9px !important;
}

}	@media only screen and (max-width: 480px){
.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
  padding-top:9px !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
  padding-top:18px !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageCardBottomImageContent{
  padding-bottom:9px !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageGroupBlockInner{
  padding-top:0 !important;
  padding-bottom:0 !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageGroupBlockOuter{
  padding-top:9px !important;
  padding-bottom:9px !important;
}

}	@media only screen and (max-width: 480px){
.mcnTextContent,.mcnBoxedTextContentColumn{
  padding-right:18px !important;
  padding-left:18px !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
  padding-right:18px !important;
  padding-bottom:0 !important;
  padding-left:18px !important;
}

}	@media only screen and (max-width: 480px){
.mcpreview-image-uploader{
  display:none !important;
  width:100% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Heading 1
@tip Make the first-level headings larger in size for better readability on small screens.
*/
h1{
  /*@editable*/font-size:22px !important;
  /*@editable*/line-height:125% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Heading 2
@tip Make the second-level headings larger in size for better readability on small screens.
*/
h2{
  /*@editable*/font-size:20px !important;
  /*@editable*/line-height:125% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Heading 3
@tip Make the third-level headings larger in size for better readability on small screens.
*/
h3{
  /*@editable*/font-size:18px !important;
  /*@editable*/line-height:125% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Heading 4
@tip Make the fourth-level headings larger in size for better readability on small screens.
*/
h4{
  /*@editable*/font-size:16px !important;
  /*@editable*/line-height:150% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Boxed Text
@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
*/
.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
  /*@editable*/font-size:14px !important;
  /*@editable*/line-height:150% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Preheader Visibility
@tip Set the visibility of the email's preheader on small screens. You can hide it to save space.
*/
#templatePreheader{
  /*@editable*/display:block !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Preheader Text
@tip Make the preheader text larger in size for better readability on small screens.
*/
#templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
  /*@editable*/font-size:14px !important;
  /*@editable*/line-height:150% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Header Text
@tip Make the header text larger in size for better readability on small screens.
*/
#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
  /*@editable*/font-size:16px !important;
  /*@editable*/line-height:150% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Body Text
@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
*/
#templateBody .mcnTextContent,#templateBody .mcnTextContent p{
  /*@editable*/font-size:16px !important;
  /*@editable*/line-height:150% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Footer Text
@tip Make the footer content text larger in size for better readability on small screens.
*/
#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
  /*@editable*/font-size:14px !important;
  /*@editable*/line-height:150% !important;
}

}</style></head>
<body>
    <center>
        <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
            <tr>
                <td align="center" valign="top" id="bodyCell">
                    <!-- BEGIN TEMPLATE // -->
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                    <tr>
                    <td align="center" valign="top" width="600" style="width:600px;">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="max-width: 600px !important;">

                        <tr>
                            <td valign="top" id="templateHeader"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
<tbody class="mcnImageBlockOuter">
        <tr>
            <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                    <tbody><tr>
                        <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">


                                    <img align="center" alt="" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/cb932210-f8ff-ef26-fe34-0f06df8a8519.png" width="279" style="max-width:279px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage">


                        </td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
</tbody>
</table></td>
                        </tr>
                        <tr>
                            <td valign="top" id="templateBody"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
<tbody class="mcnDividerBlockOuter">
    <tr>
        <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
            <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #EAEAEA;">
                <tbody><tr>
                    <td>
                        <span></span>
                    </td>
                </tr>
            </tbody></table>
<!--
            <td class="mcnDividerBlockInner" style="padding: 18px;">
            <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
-->
        </td>
    </tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
<tbody class="mcnTextBlockOuter">
    <tr>
        <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
            <!--[if mso]>
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
    <tr>
    <![endif]-->

    <!--[if mso]>
    <td valign="top" width="600" style="width:600px;">
    <![endif]-->
            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                <tbody><tr>

                    <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

                        <h1 style="text-align: center;"><span style="font-size:14px"><span style="font-family:verdana,geneva,sans-serif"><strong>Hola, ${user}</strong></span></span></h1>

<div style="text-align: center;"><span style="font-size:12px"><span style="font-family:verdana,geneva,sans-serif">Estimado(a) cliente a petición suya se le envía la cotización generada el día de hoy.</span></span></div>

                    </td>
                </tr>
            </tbody></table>
    <!--[if mso]>
    </td>
    <![endif]-->

    <!--[if mso]>
    </tr>
    </table>
    <![endif]-->
        </td>
    </tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock" style="min-width:100%;">
<!--[if gte mso 9]>
<table align="center" border="0" cellspacing="0" cellpadding="0" width="100%">
<![endif]-->
<tbody class="mcnBoxedTextBlockOuter">
    <tr>
        <td valign="top" class="mcnBoxedTextBlockInner">

    <!--[if gte mso 9]>
    <td align="center" valign="top" ">
    <![endif]-->
    <!--[if gte mso 9]>
    </td>
    <![endif]-->

    <!--[if gte mso 9]>
            </tr>
            </table>
    <![endif]-->
        </td>
    </tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
<tbody class="mcnTextBlockOuter">
    <tr>
        <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
            <!--[if mso]>
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
    <tr>
    <![endif]-->

    <!--[if mso]>
    <td valign="top" width="600" style="width:600px;">
    <![endif]-->
            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                <tbody><tr>

                    <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

                        <div style="text-align: center;"><span style="font-family:verdana,geneva,sans-serif"><span style="font-size:12px">Atentamente,<br>
Ventana Menorca</span></span></div>

                    </td>
                </tr>
            </tbody></table>
    <!--[if mso]>
    </td>
    <![endif]-->

    <!--[if mso]>
    </tr>
    </table>
    <![endif]-->
        </td>
    </tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;background: #F5F5F5;">
<tbody class="mcnTextBlockOuter">
    <tr>
        <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
            <!--[if mso]>
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
    <tr>
    <![endif]-->

    <!--[if mso]>
    <td valign="top" width="300" style="width:300px;">
    <![endif]-->
            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:300px;" width="100%" class="mcnTextContentContainer">
                <tbody><tr>

                    <td valign="top" class="mcnTextContent" style="padding-top:0; padding-left:18px; padding-bottom:9px; padding-right:18px;">

                        <img data-file-id="5913809" height="39" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/a918743d-e512-7d2f-7593-f9de280fb9bc.png" style="border: 0px  ; width: 60px; height: 39px; margin: 0px;" width="60">
                    </td>
                </tr>
            </tbody></table>
    <!--[if mso]>
    </td>
    <![endif]-->

    <!--[if mso]>
    <td valign="top" width="300" style="width:300px;">
    <![endif]-->
            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:300px;" width="100%" class="mcnTextContentContainer">
                <tbody><tr>

                    <td valign="top" class="mcnTextContent" style="padding-top:0; padding-left:18px; padding-bottom:9px; padding-right:18px;">

                        <div style="float:right;text-align:right;padding: 14px 0 0;">
                          <a href="https://instagram.com/menorcainversiones?igshid=10cetn29cdmvu" target="_blank"><img data-file-id="5913821" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/56759879-13ae-e122-c7cc-65e9c3fe710d.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                          <a href="https://www.facebook.com/menorcalotes" target="_blank"><img data-file-id="5913825" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/48690c0a-d09f-4380-86da-cb88dec0c82d.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                          <a href="https://tiktok.com/@menorcainversiones" target="_blank"><img data-file-id="5913817" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/1eea6d59-7251-f0c6-d657-2a157d2fc52e.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                          <a href="https://pe.linkedin.com/company/menorca-inversiones-s-a-c" target="_blank"><img data-file-id="5913813" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/2346c5ce-2cdd-fa62-7893-7f38700ba837.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>
                        </div>

                    </td>
                </tr>
            </tbody></table>
    <!--[if mso]>
    </td>
    <![endif]-->

    <!--[if mso]>
    </tr>
    </table>
    <![endif]-->
        </td>
    </tr>
</tbody>
</table></td>
                        </tr>

                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                    <!-- // END TEMPLATE -->
                </td>
            </tr>
        </table>
    </center>
<script type="text/javascript"  src="/PxtHz/uB/J/1/CvUJv9EyAQ4/b55fLcDLEwiV/Ay4KP0QVAw/DjxY/PBkpEjE"></script></body>
</html>
`;
  },
  referralCreated(user, userBy) {
    return `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <!-- NAME: 1 COLUMN -->
  <!--[if gte mso 15]>
  <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>*|MC:SUBJECT|*</title>

<style type="text/css">
p{
margin:10px 0;
padding:0;
}
table{
border-collapse:collapse;
}
h1,h2,h3,h4,h5,h6{
display:block;
margin:0;
padding:0;
}
img,a img{
border:0;
height:auto;
outline:none;
text-decoration:none;
}
body,#bodyTable,#bodyCell{
height:100%;
margin:0;
padding:0;
width:100%;
}
.mcnPreviewText{
display:none !important;
}
#outlook a{
padding:0;
}
img{
-ms-interpolation-mode:bicubic;
}
table{
mso-table-lspace:0pt;
mso-table-rspace:0pt;
}
.ReadMsgBody{
width:100%;
}
.ExternalClass{
width:100%;
}
p,a,li,td,blockquote{
mso-line-height-rule:exactly;
}
a[href^=tel],a[href^=sms]{
color:inherit;
cursor:default;
text-decoration:none;
}
p,a,li,td,body,table,blockquote{
-ms-text-size-adjust:100%;
-webkit-text-size-adjust:100%;
}
.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
line-height:100%;
}
a[x-apple-data-detectors]{
color:inherit !important;
text-decoration:none !important;
font-size:inherit !important;
font-family:inherit !important;
font-weight:inherit !important;
line-height:inherit !important;
}
#bodyCell{
padding:10px;
}
.templateContainer{
max-width:600px !important;
border-collapse: collapse;
    border-radius: 16px;
  border-style: hidden !important;
  box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
}

a.mcnButton{
display:block;
}
.mcnImage,.mcnRetinaImage{
vertical-align:bottom;
}
.mcnTextContent{
word-break:break-word;
}
.mcnTextContent img{
height:auto !important;
}
.mcnDividerBlock{
table-layout:fixed !important;
}
/*
@tab Page
@section Background Style
@tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
*/
body,#bodyTable{
/*@editable*/background-color:#FAFAFA;
}
/*
@tab Page
@section Background Style
@tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
*/
#bodyCell{
/*@editable*/border-top:0;
}
/*
@tab Page
@section Email Border
@tip Set the border for your email.
*/
.templateContainer{
/*@editable*/border:0;
box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
}
/*
@tab Page
@section Heading 1
@tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
@style heading 1
*/
h1{
/*@editable*/color:#202020;
/*@editable*/font-family:Helvetica;
/*@editable*/font-size:26px;
/*@editable*/font-style:normal;
/*@editable*/font-weight:bold;
/*@editable*/line-height:125%;
/*@editable*/letter-spacing:normal;
/*@editable*/text-align:left;
}
/*
@tab Page
@section Heading 2
@tip Set the styling for all second-level headings in your emails.
@style heading 2
*/
h2{
/*@editable*/color:#202020;
/*@editable*/font-family:Helvetica;
/*@editable*/font-size:22px;
/*@editable*/font-style:normal;
/*@editable*/font-weight:bold;
/*@editable*/line-height:125%;
/*@editable*/letter-spacing:normal;
/*@editable*/text-align:left;
}
/*
@tab Page
@section Heading 3
@tip Set the styling for all third-level headings in your emails.
@style heading 3
*/
h3{
/*@editable*/color:#202020;
/*@editable*/font-family:Helvetica;
/*@editable*/font-size:20px;
/*@editable*/font-style:normal;
/*@editable*/font-weight:bold;
/*@editable*/line-height:125%;
/*@editable*/letter-spacing:normal;
/*@editable*/text-align:left;
}
/*
@tab Page
@section Heading 4
@tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
@style heading 4
*/
h4{
/*@editable*/color:#202020;
/*@editable*/font-family:Helvetica;
/*@editable*/font-size:18px;
/*@editable*/font-style:normal;
/*@editable*/font-weight:bold;
/*@editable*/line-height:125%;
/*@editable*/letter-spacing:normal;
/*@editable*/text-align:left;
}
/*
@tab Preheader
@section Preheader Style
@tip Set the background color and borders for your email's preheader area.
*/
#templatePreheader{
/*@editable*/background-color:#FAFAFA;
/*@editable*/background-image:none;
/*@editable*/background-repeat:no-repeat;
/*@editable*/background-position:center;
/*@editable*/background-size:cover;
/*@editable*/border-top:0;
/*@editable*/border-bottom:0;
/*@editable*/padding-top:9px;
/*@editable*/padding-bottom:9px;
}
/*
@tab Preheader
@section Preheader Text
@tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
*/
#templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
/*@editable*/color:#656565;
/*@editable*/font-family:Helvetica;
/*@editable*/font-size:12px;
/*@editable*/line-height:150%;
/*@editable*/text-align:left;
}
/*
@tab Preheader
@section Preheader Link
@tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
*/
#templatePreheader .mcnTextContent a,#templatePreheader .mcnTextContent p a{
/*@editable*/color:#656565;
/*@editable*/font-weight:normal;
/*@editable*/text-decoration:underline;
}
/*
@tab Header
@section Header Style
@tip Set the background color and borders for your email's header area.
*/
#templateHeader{
background-color: initial;
/*@editable*/background-image:none;
/*@editable*/background-repeat:no-repeat;
/*@editable*/background-position:center;
/*@editable*/background-size:cover;
/*@editable*/border-top:0;
/*@editable*/border-bottom:0;
/*@editable*/padding-top:9px;
/*@editable*/padding-bottom:0;
}
/*
@tab Header
@section Header Text
@tip Set the styling for your email's header text. Choose a size and color that is easy to read.
*/
#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
/*@editable*/color:#202020;
/*@editable*/font-family:Helvetica;
/*@editable*/font-size:16px;
/*@editable*/line-height:150%;
/*@editable*/text-align:left;
}
/*
@tab Header
@section Header Link
@tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
*/
#templateHeader .mcnTextContent a,#templateHeader .mcnTextContent p a{
/*@editable*/color:#007C89;
/*@editable*/font-weight:normal;
/*@editable*/text-decoration:underline;
}
/*
@tab Body
@section Body Style
@tip Set the background color and borders for your email's body area.
*/
#templateBody{
background-color: initial !important;
/*@editable*/background-image:none;
/*@editable*/background-repeat:no-repeat;
/*@editable*/background-position:center;
/*@editable*/background-size:cover;
/*@editable*/border-top:0;
/*@editable*/border-bottom:2px solid #EAEAEA;
/*@editable*/padding-top:0;
/*@editable*/padding-bottom:0;
}
/*
@tab Body
@section Body Text
@tip Set the styling for your email's body text. Choose a size and color that is easy to read.
*/
#templateBody .mcnTextContent,#templateBody .mcnTextContent p{
/*@editable*/color:#202020;
/*@editable*/font-family:Helvetica;
/*@editable*/font-size:16px;
/*@editable*/line-height:150%;
/*@editable*/text-align:left;
}
/*
@tab Body
@section Body Link
@tip Set the styling for your email's body links. Choose a color that helps them stand out from your text.
*/
#templateBody .mcnTextContent a,#templateBody .mcnTextContent p a{
/*@editable*/color:#007C89;
/*@editable*/font-weight:normal;
/*@editable*/text-decoration:underline;
}
/*
@tab Footer
@section Footer Style
@tip Set the background color and borders for your email's footer area.
*/
#templateFooter{
/*@editable*/background-color:#FAFAFA;
/*@editable*/background-image:none;
/*@editable*/background-repeat:no-repeat;
/*@editable*/background-position:center;
/*@editable*/background-size:cover;
/*@editable*/border-top:0;
/*@editable*/border-bottom:0;
/*@editable*/padding-top:9px;
/*@editable*/padding-bottom:9px;
}
/*
@tab Footer
@section Footer Text
@tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
*/
#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
/*@editable*/color:#656565;
/*@editable*/font-family:Helvetica;
/*@editable*/font-size:12px;
/*@editable*/line-height:150%;
/*@editable*/text-align:center;
}
/*
@tab Footer
@section Footer Link
@tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
*/
#templateFooter .mcnTextContent a,#templateFooter .mcnTextContent p a{
/*@editable*/color:#656565;
/*@editable*/font-weight:normal;
/*@editable*/text-decoration:underline;
}
@media only screen and (min-width:768px){
.templateContainer{
width:600px !important;
}

}	@media only screen and (max-width: 480px){
body,table,td,p,a,li,blockquote{
-webkit-text-size-adjust:none !important;
}

}	@media only screen and (max-width: 480px){
body{
width:100% !important;
min-width:100% !important;
}

}	@media only screen and (max-width: 480px){
.mcnRetinaImage{
max-width:100% !important;
}

}	@media only screen and (max-width: 480px){
.mcnImage{
width:100% !important;
}

}	@media only screen and (max-width: 480px){
.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
max-width:100% !important;
width:100% !important;
}

}	@media only screen and (max-width: 480px){
.mcnBoxedTextContentContainer{
min-width:100% !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageGroupContent{
padding:9px !important;
}

}	@media only screen and (max-width: 480px){
.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
padding-top:9px !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
padding-top:18px !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageCardBottomImageContent{
padding-bottom:9px !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageGroupBlockInner{
padding-top:0 !important;
padding-bottom:0 !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageGroupBlockOuter{
padding-top:9px !important;
padding-bottom:9px !important;
}

}	@media only screen and (max-width: 480px){
.mcnTextContent,.mcnBoxedTextContentColumn{
padding-right:18px !important;
padding-left:18px !important;
}

}	@media only screen and (max-width: 480px){
.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
padding-right:18px !important;
padding-bottom:0 !important;
padding-left:18px !important;
}

}	@media only screen and (max-width: 480px){
.mcpreview-image-uploader{
display:none !important;
width:100% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Heading 1
@tip Make the first-level headings larger in size for better readability on small screens.
*/
h1{
/*@editable*/font-size:22px !important;
/*@editable*/line-height:125% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Heading 2
@tip Make the second-level headings larger in size for better readability on small screens.
*/
h2{
/*@editable*/font-size:20px !important;
/*@editable*/line-height:125% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Heading 3
@tip Make the third-level headings larger in size for better readability on small screens.
*/
h3{
/*@editable*/font-size:18px !important;
/*@editable*/line-height:125% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Heading 4
@tip Make the fourth-level headings larger in size for better readability on small screens.
*/
h4{
/*@editable*/font-size:16px !important;
/*@editable*/line-height:150% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Boxed Text
@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
*/
.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
/*@editable*/font-size:14px !important;
/*@editable*/line-height:150% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Preheader Visibility
@tip Set the visibility of the email's preheader on small screens. You can hide it to save space.
*/
#templatePreheader{
/*@editable*/display:block !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Preheader Text
@tip Make the preheader text larger in size for better readability on small screens.
*/
#templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
/*@editable*/font-size:14px !important;
/*@editable*/line-height:150% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Header Text
@tip Make the header text larger in size for better readability on small screens.
*/
#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
/*@editable*/font-size:16px !important;
/*@editable*/line-height:150% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Body Text
@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
*/
#templateBody .mcnTextContent,#templateBody .mcnTextContent p{
/*@editable*/font-size:16px !important;
/*@editable*/line-height:150% !important;
}

}	@media only screen and (max-width: 480px){
/*
@tab Mobile Styles
@section Footer Text
@tip Make the footer content text larger in size for better readability on small screens.
*/
#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
/*@editable*/font-size:14px !important;
/*@editable*/line-height:150% !important;
}

}</style></head>
<body>
  <center>
      <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
          <tr>
              <td align="center" valign="top" id="bodyCell">
                  <!-- BEGIN TEMPLATE // -->
                  <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                  <tr>
                  <td align="center" valign="top" width="600" style="width:600px;">
                  <![endif]-->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="max-width: 600px !important;">

                      <tr>
                          <td valign="top" id="templateHeader"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
<tbody class="mcnImageBlockOuter">
      <tr>
          <td valign="top" style="padding:9px" class="mcnImageBlockInner">
              <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                  <tbody><tr>
                      <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">


                                  <img align="center" alt="" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/cb932210-f8ff-ef26-fe34-0f06df8a8519.png" width="279" style="max-width:279px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage">


                      </td>
                  </tr>
              </tbody></table>
          </td>
      </tr>
</tbody>
</table></td>
                      </tr>
                      <tr>
                          <td valign="top" id="templateBody"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
<tbody class="mcnDividerBlockOuter">
  <tr>
      <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
          <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #EAEAEA;">
              <tbody><tr>
                  <td>
                      <span></span>
                  </td>
              </tr>
          </tbody></table>
<!--
          <td class="mcnDividerBlockInner" style="padding: 18px;">
          <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
-->
      </td>
  </tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
<tbody class="mcnTextBlockOuter">
  <tr>
      <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
          <!--[if mso]>
  <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
  <tr>
  <![endif]-->

  <!--[if mso]>
  <td valign="top" width="600" style="width:600px;">
  <![endif]-->
          <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
              <tbody><tr>

                  <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

                      <h1 style="text-align: center;"><span style="font-size:14px"><span style="font-family:verdana,geneva,sans-serif"><strong>Hola, ${user}</strong></span></span></h1>

<div style="text-align: center;"><span style="font-size:12px"><span style="font-family:verdana,geneva,sans-serif">Estimado(a) usuario, ha sido agregado como referido por parte de ${userBy}.</span></span></div>

                  </td>
              </tr>
          </tbody></table>
  <!--[if mso]>
  </td>
  <![endif]-->

  <!--[if mso]>
  </tr>
  </table>
  <![endif]-->
      </td>
  </tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock" style="min-width:100%;">
<!--[if gte mso 9]>
<table align="center" border="0" cellspacing="0" cellpadding="0" width="100%">
<![endif]-->
<tbody class="mcnBoxedTextBlockOuter">
  <tr>
      <td valign="top" class="mcnBoxedTextBlockInner">

  <!--[if gte mso 9]>
  <td align="center" valign="top" ">
  <![endif]-->
  <!--[if gte mso 9]>
  </td>
  <![endif]-->

  <!--[if gte mso 9]>
          </tr>
          </table>
  <![endif]-->
      </td>
  </tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
<tbody class="mcnTextBlockOuter">
  <tr>
      <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
          <!--[if mso]>
  <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
  <tr>
  <![endif]-->

  <!--[if mso]>
  <td valign="top" width="600" style="width:600px;">
  <![endif]-->
          <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
              <tbody><tr>

                  <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

                      <div style="text-align: center;"><span style="font-family:verdana,geneva,sans-serif"><span style="font-size:12px">Atentamente,<br>
Ventana Menorca</span></span></div>

                  </td>
              </tr>
          </tbody></table>
  <!--[if mso]>
  </td>
  <![endif]-->

  <!--[if mso]>
  </tr>
  </table>
  <![endif]-->
      </td>
  </tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;background: #F5F5F5;">
<tbody class="mcnTextBlockOuter">
  <tr>
      <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
          <!--[if mso]>
  <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
  <tr>
  <![endif]-->

  <!--[if mso]>
  <td valign="top" width="300" style="width:300px;">
  <![endif]-->
          <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:300px;" width="100%" class="mcnTextContentContainer">
              <tbody><tr>

                  <td valign="top" class="mcnTextContent" style="padding-top:0; padding-left:18px; padding-bottom:9px; padding-right:18px;">

                      <img data-file-id="5913809" height="39" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/a918743d-e512-7d2f-7593-f9de280fb9bc.png" style="border: 0px  ; width: 60px; height: 39px; margin: 0px;" width="60">
                  </td>
              </tr>
          </tbody></table>
  <!--[if mso]>
  </td>
  <![endif]-->

  <!--[if mso]>
  <td valign="top" width="300" style="width:300px;">
  <![endif]-->
          <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:300px;" width="100%" class="mcnTextContentContainer">
              <tbody><tr>

                  <td valign="top" class="mcnTextContent" style="padding-top:0; padding-left:18px; padding-bottom:9px; padding-right:18px;">

                      <div style="float:right;text-align:right;padding: 14px 0 0;">
                        <a href="https://instagram.com/menorcainversiones?igshid=10cetn29cdmvu" target="_blank"><img data-file-id="5913821" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/56759879-13ae-e122-c7cc-65e9c3fe710d.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                        <a href="https://www.facebook.com/menorcalotes" target="_blank"><img data-file-id="5913825" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/48690c0a-d09f-4380-86da-cb88dec0c82d.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                        <a href="https://tiktok.com/@menorcainversiones" target="_blank"><img data-file-id="5913817" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/1eea6d59-7251-f0c6-d657-2a157d2fc52e.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>&nbsp;
                        <a href="https://pe.linkedin.com/company/menorca-inversiones-s-a-c" target="_blank"><img data-file-id="5913813" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/2346c5ce-2cdd-fa62-7893-7f38700ba837.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;" width="24"></a>
                      </div>

                  </td>
              </tr>
          </tbody></table>
  <!--[if mso]>
  </td>
  <![endif]-->

  <!--[if mso]>
  </tr>
  </table>
  <![endif]-->
      </td>
  </tr>
</tbody>
</table></td>
                      </tr>

                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
                  <!-- // END TEMPLATE -->
              </td>
          </tr>
      </table>
  </center>
<script type="text/javascript"  src="/PxtHz/uB/J/1/CvUJv9EyAQ4/b55fLcDLEwiV/Ay4KP0QVAw/DjxY/PBkpEjE"></script></body>
</html>
`;
  },
  summaryQuotes(date, items) {
    let html = `
      <!doctype html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
      <!-- NAME: 1 COLUMN -->
      <!--[if gte mso 15]>
      <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>*|MC:SUBJECT|*</title>
  
      <style type="text/css">
          p {
              margin: 10px 0;
              padding: 0;
          }
          
          table {
              border-collapse: collapse;
          }
          
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
              display: block;
              margin: 0;
              padding: 0;
          }
          
          img,
          a img {
              border: 0;
              height: auto;
              outline: none;
              text-decoration: none;
          }
          
          body,
          #bodyTable,
          #bodyCell {
              height: 100%;
              margin: 0;
              padding: 0;
              width: 100%;
          }
          
          .mcnPreviewText {
              display: none !important;
          }
          
          #outlook a {
              padding: 0;
          }
          
          img {
              -ms-interpolation-mode: bicubic;
          }
          
          table {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
          }
          
          .ReadMsgBody {
              width: 100%;
          }
          
          .ExternalClass {
              width: 100%;
          }
          
          p,
          a,
          li,
          td,
          blockquote {
              mso-line-height-rule: exactly;
          }
          
          a[href^=tel],
          a[href^=sms] {
              color: inherit;
              cursor: default;
              text-decoration: none;
          }
          
          p,
          a,
          li,
          td,
          body,
          table,
          blockquote {
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
          }
          
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass td,
          .ExternalClass div,
          .ExternalClass span,
          .ExternalClass font {
              line-height: 100%;
          }
          
          a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: none !important;
              font-size: inherit !important;
              font-family: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
          }
          
          #bodyCell {
              padding: 10px;
          }
          
          .templateContainer {
              max-width: 600px !important;
              border-collapse: collapse;
              border-radius: 16px;
              border-style: hidden !important;
              box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
          }
          
          a.mcnButton {
              display: block;
          }
          
          .mcnImage,
          .mcnRetinaImage {
              vertical-align: bottom;
          }
          
          .mcnTextContent {
              word-break: break-word;
          }
          
          .mcnTextContent img {
              height: auto !important;
          }
          
          .mcnDividerBlock {
              table-layout: fixed !important;
          }
  
          /*
  @tab Page
  @section Background Style
  @tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
  */
          
          body,
          #bodyTable {
              /*@editable*/
              background-color: #FAFAFA;
          }
          /*
  @tab Page
  @section Background Style
  @tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
  */
          
          #bodyCell {
              /*@editable*/
              border-top: 0;
          }
          /*
  @tab Page
  @section Email Border
  @tip Set the border for your email.
  */
          
          .templateContainer {
              /*@editable*/
              border: 0;
              box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
          }
          /*
  @tab Page
  @section Heading 1
  @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
  @style heading 1
  */
          
          h1 {
              /*@editable*/
              color: #202020;
              /*@editable*/
              font-family: Helvetica;
              /*@editable*/
              font-size: 26px;
              /*@editable*/
              font-style: normal;
              /*@editable*/
              font-weight: bold;
              /*@editable*/
              line-height: 125%;
              /*@editable*/
              letter-spacing: normal;
              /*@editable*/
              text-align: left;
          }
          /*
  @tab Page
  @section Heading 2
  @tip Set the styling for all second-level headings in your emails.
  @style heading 2
  */
          
          h2 {
              /*@editable*/
              color: #202020;
              /*@editable*/
              font-family: Helvetica;
              /*@editable*/
              font-size: 22px;
              /*@editable*/
              font-style: normal;
              /*@editable*/
              font-weight: bold;
              /*@editable*/
              line-height: 125%;
              /*@editable*/
              letter-spacing: normal;
              /*@editable*/
              text-align: left;
          }
          /*
  @tab Page
  @section Heading 3
  @tip Set the styling for all third-level headings in your emails.
  @style heading 3
  */
          
          h3 {
              /*@editable*/
              color: #202020;
              /*@editable*/
              font-family: Helvetica;
              /*@editable*/
              font-size: 20px;
              /*@editable*/
              font-style: normal;
              /*@editable*/
              font-weight: bold;
              /*@editable*/
              line-height: 125%;
              /*@editable*/
              letter-spacing: normal;
              /*@editable*/
              text-align: left;
          }
          /*
  @tab Page
  @section Heading 4
  @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
  @style heading 4
  */
          
          h4 {
              /*@editable*/
              color: #202020;
              /*@editable*/
              font-family: Helvetica;
              /*@editable*/
              font-size: 18px;
              /*@editable*/
              font-style: normal;
              /*@editable*/
              font-weight: bold;
              /*@editable*/
              line-height: 125%;
              /*@editable*/
              letter-spacing: normal;
              /*@editable*/
              text-align: left;
          }
          /*
  @tab Preheader
  @section Preheader Style
  @tip Set the background color and borders for your email's preheader area.
  */
          
          #templatePreheader {
              /*@editable*/
              background-color: #FAFAFA;
              /*@editable*/
              background-image: none;
              /*@editable*/
              background-repeat: no-repeat;
              /*@editable*/
              background-position: center;
              /*@editable*/
              background-size: cover;
              /*@editable*/
              border-top: 0;
              /*@editable*/
              border-bottom: 0;
              /*@editable*/
              padding-top: 9px;
              /*@editable*/
              padding-bottom: 9px;
          }
          /*
  @tab Preheader
  @section Preheader Text
  @tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
  */
          
          #templatePreheader .mcnTextContent,
          #templatePreheader .mcnTextContent p {
              /*@editable*/
              color: #656565;
              /*@editable*/
              font-family: Helvetica;
              /*@editable*/
              font-size: 12px;
              /*@editable*/
              line-height: 150%;
              /*@editable*/
              text-align: left;
          }
          /*
  @tab Preheader
  @section Preheader Link
  @tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
  */
          
          #templatePreheader .mcnTextContent a,
          #templatePreheader .mcnTextContent p a {
              /*@editable*/
              color: #656565;
              /*@editable*/
              font-weight: normal;
              /*@editable*/
              text-decoration: underline;
          }
          /*
  @tab Header
  @section Header Style
  @tip Set the background color and borders for your email's header area.
  */
          
          #templateHeader {
              background-color: initial;
              /*@editable*/
              background-image: none;
              /*@editable*/
              background-repeat: no-repeat;
              /*@editable*/
              background-position: center;
              /*@editable*/
              background-size: cover;
              /*@editable*/
              border-top: 0;
              /*@editable*/
              border-bottom: 0;
              /*@editable*/
              padding-top: 9px;
              /*@editable*/
              padding-bottom: 0;
          }
          /*
  @tab Header
  @section Header Text
  @tip Set the styling for your email's header text. Choose a size and color that is easy to read.
  */
          
          #templateHeader .mcnTextContent,
          #templateHeader .mcnTextContent p {
              /*@editable*/
              color: #202020;
              /*@editable*/
              font-family: Helvetica;
              /*@editable*/
              font-size: 14px;
              /*@editable*/
              line-height: 150%;
              /*@editable*/
              text-align: left;
          }
          /*
  @tab Header
  @section Header Link
  @tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
  */
          
          #templateHeader .mcnTextContent a,
          #templateHeader .mcnTextContent p a {
              /*@editable*/
              color: #007C89;
              /*@editable*/
              font-weight: normal;
              /*@editable*/
              text-decoration: underline;
          }
          /*
  @tab Body
  @section Body Style
  @tip Set the background color and borders for your email's body area.
  */
          
          #templateBody {
              background-color: initial !important;
              /*@editable*/
              background-image: none;
              /*@editable*/
              background-repeat: no-repeat;
              /*@editable*/
              background-position: center;
              /*@editable*/
              background-size: cover;
              /*@editable*/
              border-top: 0;
              /*@editable*/
              border-bottom: 2px solid #EAEAEA;
              /*@editable*/
              padding-top: 0;
              /*@editable*/
              padding-bottom: 0;
          }
          /*
  @tab Body
  @section Body Text
  @tip Set the styling for your email's body text. Choose a size and color that is easy to read.
  */
          
          #templateBody .mcnTextContent,
          #templateBody .mcnTextContent p {
              /*@editable*/
              color: #202020;
              /*@editable*/
              font-family: Helvetica;
              /*@editable*/
              font-size: 14px;
              /*@editable*/
              line-height: 150%;
              /*@editable*/
              text-align: left;
          }
          /*
  @tab Body
  @section Body Link
  @tip Set the styling for your email's body links. Choose a color that helps them stand out from your text.
  */
          
          #templateBody .mcnTextContent a,
          #templateBody .mcnTextContent p a {
              /*@editable*/
              color: #007C89;
              /*@editable*/
              font-weight: normal;
              /*@editable*/
              text-decoration: underline;
          }
          /*
  @tab Footer
  @section Footer Style
  @tip Set the background color and borders for your email's footer area.
  */
          
          #templateFooter {
              /*@editable*/
              background-color: #FAFAFA;
              /*@editable*/
              background-image: none;
              /*@editable*/
              background-repeat: no-repeat;
              /*@editable*/
              background-position: center;
              /*@editable*/
              background-size: cover;
              /*@editable*/
              border-top: 0;
              /*@editable*/
              border-bottom: 0;
              /*@editable*/
              padding-top: 9px;
              /*@editable*/
              padding-bottom: 9px;
          }
          /*
  @tab Footer
  @section Footer Text
  @tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
  */
          
          #templateFooter .mcnTextContent,
          #templateFooter .mcnTextContent p {
              /*@editable*/
              color: #656565;
              /*@editable*/
              font-family: Helvetica;
              /*@editable*/
              font-size: 12px;
              /*@editable*/
              line-height: 150%;
              /*@editable*/
              text-align: center;
          }
          /*
  @tab Footer
  @section Footer Link
  @tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
  */
          
          #templateFooter .mcnTextContent a,
          #templateFooter .mcnTextContent p a {
              /*@editable*/
              color: #656565;
              /*@editable*/
              font-weight: normal;
              /*@editable*/
              text-decoration: underline;
          }
          
          @media only screen and (min-width:768px) {
              .templateContainer {
                  width: 600px !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              body,
              table,
              td,
              p,
              a,
              li,
              blockquote {
                  -webkit-text-size-adjust: none !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              body {
                  width: 100% !important;
                  min-width: 100% !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              .mcnRetinaImage {
                  max-width: 100% !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              .mcnImage {
                  width: 100% !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              .mcnCartContainer,
              .mcnCaptionTopContent,
              .mcnRecContentContainer,
              .mcnCaptionBottomContent,
              .mcnTextContentContainer,
              .mcnBoxedTextContentContainer,
              .mcnImageGroupContentContainer,
              .mcnCaptionLeftTextContentContainer,
              .mcnCaptionRightTextContentContainer,
              .mcnCaptionLeftImageContentContainer,
              .mcnCaptionRightImageContentContainer,
              .mcnImageCardLeftTextContentContainer,
              .mcnImageCardRightTextContentContainer,
              .mcnImageCardLeftImageContentContainer,
              .mcnImageCardRightImageContentContainer {
                  max-width: 100% !important;
                  width: 100% !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              .mcnBoxedTextContentContainer {
                  min-width: 100% !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              .mcnImageGroupContent {
                  padding: 9px !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              .mcnCaptionLeftContentOuter .mcnTextContent,
              .mcnCaptionRightContentOuter .mcnTextContent {
                  padding-top: 9px !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              .mcnImageCardTopImageContent,
              .mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,
              .mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent {
                  padding-top: 18px !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              .mcnImageCardBottomImageContent {
                  padding-bottom: 9px !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              .mcnImageGroupBlockInner {
                  padding-top: 0 !important;
                  padding-bottom: 0 !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              .mcnImageGroupBlockOuter {
                  padding-top: 9px !important;
                  padding-bottom: 9px !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              .mcnTextContent,
              .mcnBoxedTextContentColumn {
                  padding-right: 18px !important;
                  padding-left: 18px !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              .mcnImageCardLeftImageContent,
              .mcnImageCardRightImageContent {
                  padding-right: 18px !important;
                  padding-bottom: 0 !important;
                  padding-left: 18px !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              .mcpreview-image-uploader {
                  display: none !important;
                  width: 100% !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              /*
  @tab Mobile Styles
  @section Heading 1
  @tip Make the first-level headings larger in size for better readability on small screens.
  */
              h1 {
                  /*@editable*/
                  font-size: 22px !important;
                  /*@editable*/
                  line-height: 125% !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              /*
  @tab Mobile Styles
  @section Heading 2
  @tip Make the second-level headings larger in size for better readability on small screens.
  */
              h2 {
                  /*@editable*/
                  font-size: 20px !important;
                  /*@editable*/
                  line-height: 125% !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              /*
  @tab Mobile Styles
  @section Heading 3
  @tip Make the third-level headings larger in size for better readability on small screens.
  */
              h3 {
                  /*@editable*/
                  font-size: 18px !important;
                  /*@editable*/
                  line-height: 125% !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              /*
  @tab Mobile Styles
  @section Heading 4
  @tip Make the fourth-level headings larger in size for better readability on small screens.
  */
              h4 {
                  /*@editable*/
                  font-size: 16px !important;
                  /*@editable*/
                  line-height: 150% !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              /*
  @tab Mobile Styles
  @section Boxed Text
  @tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
  */
              .mcnBoxedTextContentContainer .mcnTextContent,
              .mcnBoxedTextContentContainer .mcnTextContent p {
                  /*@editable*/
                  font-size: 14px !important;
                  /*@editable*/
                  line-height: 150% !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              /*
  @tab Mobile Styles
  @section Preheader Visibility
  @tip Set the visibility of the email's preheader on small screens. You can hide it to save space.
  */
              #templatePreheader {
                  /*@editable*/
                  display: block !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              /*
  @tab Mobile Styles
  @section Preheader Text
  @tip Make the preheader text larger in size for better readability on small screens.
  */
              #templatePreheader .mcnTextContent,
              #templatePreheader .mcnTextContent p {
                  /*@editable*/
                  font-size: 14px !important;
                  /*@editable*/
                  line-height: 150% !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              /*
  @tab Mobile Styles
  @section Header Text
  @tip Make the header text larger in size for better readability on small screens.
  */
              #templateHeader .mcnTextContent,
              #templateHeader .mcnTextContent p {
                  /*@editable*/
                  font-size: 14px !important;
                  /*@editable*/
                  line-height: 150% !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              /*
  @tab Mobile Styles
  @section Body Text
  @tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
  */
              #templateBody .mcnTextContent,
              #templateBody .mcnTextContent p {
                  /*@editable*/
                  font-size: 14px !important;
                  /*@editable*/
                  line-height: 150% !important;
              }
          }
          
          @media only screen and (max-width: 480px) {
              /*
  @tab Mobile Styles
  @section Footer Text
  @tip Make the footer content text larger in size for better readability on small screens.
  */
              #templateFooter .mcnTextContent,
              #templateFooter .mcnTextContent p {
                  /*@editable*/
                  font-size: 14px !important;
                  /*@editable*/
                  line-height: 150% !important;
              }
          }
      </style>
  </head>
  
  <body>
      <center>
          <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
              <tr>
                  <td align="center" valign="top" id="bodyCell">
                      <!-- BEGIN TEMPLATE // -->
                      <!--[if (gte mso 9)|(IE)]>
                      <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                      <tr>
                      <td align="center" valign="top" width="600" style="width:600px;">
                      <![endif]-->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="max-width: 600px !important;">
  
                          <tr>
                              <td valign="top" id="templateHeader">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
                                      <tbody class="mcnImageBlockOuter">
                                          <tr>
                                              <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                                                  <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                                                      <tbody>
                                                          <tr>
                                                              <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">
  
  
                                                                  <img align="center" alt="" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/cb932210-f8ff-ef26-fe34-0f06df8a8519.png" width="279" style="max-width:279px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage">
  
  
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td valign="top" id="templateBody">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
                                      <tbody class="mcnDividerBlockOuter">
                                          <tr>
                                              <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
                                                  <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #EAEAEA;">
                                                      <tbody>
                                                          <tr>
                                                              <td>
                                                                  <span></span>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!--
              <td class="mcnDividerBlockInner" style="padding: 18px;">
              <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
  -->
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
                                      <tbody class="mcnTextBlockOuter">
                                          <tr>
                                              <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                                                  <!--[if mso]>
      <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
      <tr>
      <![endif]-->
  
                                                  <!--[if mso]>
      <td valign="top" width="600" style="width:600px;">
      <![endif]-->
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                                                      <tbody>
                                                          <tr>
  
                                                              <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
  
                                                                  <h1 style="text-align: center;"><span style="font-size:16px"><span style="font-family:verdana,geneva,sans-serif"><strong>Hola, Guardian Constructor</strong></span></span>
                                                                  </h1>
  
                                                                  <div style="text-align: center;"><span style="font-size:14px"><span style="font-family:verdana,geneva,sans-serif">Estimado(a) Guardian Constructor, a continuación adjuntamos la lista de cotizaciones realizadas el día <strong>${date}</strong> por los clientes de Ventana Menorca.</span></span>
                                                                  </div>
  
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
  
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                                                      <tbody>`;

    for (let a = 0; a < items.length; a++) {
      html += `
          <tr style="font-size:14px;background-color:${items[a].background}">
  
          <td valign="top" class="mcnTextContent" style="padding: 2rem;">
  
              <span style="font-size:16px;display:block;margin-top:0;"><strong>Cliente interesado:</strong></span>
              <ul style="list-style-type:none;padding:0;">
                  <li style="margin-bottom:5px;margin-left:0;color: #000000;"><span style="color: #686868;display:inline-block;width:170px;">Nombre:</span> ${items[a].username}</li>
                  <li style="margin-bottom:5px;margin-left:0;color: #000000;"><span style="color: #686868;display:inline-block;width:170px;">DNI:</span> ${items[a].userdni}</li>
                  <li style="margin-bottom:5px;margin-left:0;color: #000000;"><span style="color: #686868;display:inline-block;width:170px;">Teléfono:</span> ${items[a].userphone}</li>
                  <li style="margin-bottom:5px;margin-left:0;color: #000000;"><span style="color: #686868;display:inline-block;width:170px;">Email:</span> ${items[a].useremail}</li>
  
                  <li style="margin-bottom:5px;margin-left:0;color: #000000;"><span style="color: #686868;display:inline-block;width:170px;">Fecha de contrato:</span> ${items[a].contractDate}</li>
                  <li style="margin-bottom:5px;margin-left:0;color: #000000;"><span style="color: #686868;display:inline-block;width:170px;">N° cuotas:</span> ${items[a].quotesNumber}</li>
                  <li style="margin-bottom:5px;margin-left:0;color: #000000;"><span style="color: #686868;display:inline-block;width:170px;">Monto cuota:</span> ${items[a].quoteQuantity}</li>
                  <li style="margin-bottom:5px;margin-left:0;color: #000000;"><span style="color: #686868;display:inline-block;width:170px;">Etapa:</span> ${items[a].etapa}</li>
                  <li style="margin-bottom:5px;margin-left:0;color: #000000;"><span style="color: #686868;display:inline-block;width:170px;">Mz:</span> ${items[a].mz}</li>
                  <li style="margin-bottom:5px;margin-left:0;color: #000000;"><span style="color: #686868;display:inline-block;width:170px;">Lote:</span> ${items[a].lote}</li>
                  <li style="margin-bottom:5px;margin-left:0;color: #000000;"><span style="color: #686868;display:inline-block;width:170px;">Área del inmueble:</span> ${items[a].propertyArea}</li>
                  <li style="margin-bottom:0px;margin-left:0;color: #000000;"><span style="color: #686868;display:inline-block;width:170px;">Área máxima permitida:</span> ${items[a].propertyAreaMax}</li>
              </ul>`;

      if (items[a].ambientes.length) {
        html += '<span style="font-size:16px;display:block;margin-top:25px;"><strong>Información de cotización:</strong></span>';
      }

      for (let b = 0; b < items[a].ambientes.length; b++) {
        html += `
              <span style="color:#158A2F;display:block;margin-top:7px;font-size:16px;"><strong>Ambiente ${(b + 1).toString().padStart(2, '0')}</strong></span>
              <ul style="list-style-type:none;padding:0;">
                  <li style="margin-bottom:5px;margin-left:0;color: #000000;"><span style="color: #686868;display:inline-block;width:260px;">Desea construir:</span> ${items[a].projecttype}</li>
                  <li style="margin-bottom:5px;margin-left:0;color: #000000;"><span style="color: #686868;display:inline-block;width:260px;">Desea empezar a construir:</span> ${items[a].startdate}</li>
                  <li style="margin-bottom:5px;margin-left:0;color: #000000;"><span style="color: #686868;display:inline-block;width:260px;">Necesita asesoramiento:</span> ${items[a].counseling}</li>
                  <li style="margin-bottom:5px;margin-left:0;color: #000000;"><span style="color: #686868;display:inline-block;width:260px;">Construcción será en el piso:</span> ${items[a].ambientes[b].location}</li>
                  <li style="margin-bottom:5px;margin-left:0;color: #000000;"><span style="color: #686868;display:inline-block;width:260px;">Ambiente que desea construir:</span> ${items[a].ambientes[b].roomtype}</li>
                  <li style="margin-bottom:5px;margin-left:0;color: #000000;"><span style="color: #686868;display:inline-block;width:260px;">Ancho y alto de la construcción:</span> ${items[a].ambientes[b].anchoalto}</li>
                  <li style="margin-bottom:0px;margin-left:0;color: #000000;"><span style="color: #686868;display:inline-block;width:260px;">Sub total calculado por ambiente:</span> ${items[a].ambientes[b].subtotal}</li>
              </ul>
              `;
      }

      html += `</td>
      </tr>
          `;
    }

    html += `</tbody>
                                                  </table>
  
                                                  <!--[if mso]>
      </td>
      <![endif]-->
  
                                                  <!--[if mso]>
      </tr>
      </table>
      <![endif]-->
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock" style="min-width:100%;">
                                      <!--[if gte mso 9]>
  <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%">
  <![endif]-->
                                      <tbody class="mcnBoxedTextBlockOuter">
                                          <tr>
                                              <td valign="top" class="mcnBoxedTextBlockInner">
  
                                                  <!--[if gte mso 9]>
      <td align="center" valign="top" ">
      <![endif]-->
                                                  <!--[if gte mso 9]>
      </td>
      <![endif]-->
  
                                                  <!--[if gte mso 9]>
              </tr>
              </table>
      <![endif]-->
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
                                      <tbody class="mcnTextBlockOuter">
                                          <tr>
                                              <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                                                  <!--[if mso]>
      <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
      <tr>
      <![endif]-->
  
                                                  <!--[if mso]>
      <td valign="top" width="600" style="width:600px;">
      <![endif]-->
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                                                      <tbody>
                                                          <tr>
  
                                                              <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
  
                                                                  <div style="text-align: center;"><span style="font-family:verdana,geneva,sans-serif"><span style="font-size:12px">Atentamente,<br>
  Ventana Menorca</span></span>
                                                                  </div>
  
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!--[if mso]>
      </td>
      <![endif]-->
  
                                                  <!--[if mso]>
      </tr>
      </table>
      <![endif]-->
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;background: #F5F5F5;">
                                      <tbody class="mcnTextBlockOuter">
                                          <tr>
                                              <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                                                  <!--[if mso]>
      <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
      <tr>
      <![endif]-->
  
                                                  <!--[if mso]>
      <td valign="top" width="300" style="width:300px;">
      <![endif]-->
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:300px;" width="100%" class="mcnTextContentContainer">
                                                      <tbody>
                                                          <tr>
  
                                                              <td valign="top" class="mcnTextContent" style="padding-top:0; padding-left:18px; padding-bottom:9px; padding-right:18px;">
  
                                                                  <img data-file-id="5913809" height="39" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/a918743d-e512-7d2f-7593-f9de280fb9bc.png" style="border: 0px  ; width: 60px; height: 39px; margin: 0px;" width="60">
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!--[if mso]>
      </td>
      <![endif]-->
  
                                                  <!--[if mso]>
      <td valign="top" width="300" style="width:300px;">
      <![endif]-->
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:300px;" width="100%" class="mcnTextContentContainer">
                                                      <tbody>
                                                          <tr>
  
                                                              <td valign="top" class="mcnTextContent" style="padding-top:0; padding-left:18px; padding-bottom:9px; padding-right:18px;">
  
                                                                  <div style="float:right;text-align:right;padding: 14px 0 0;">
                                                                      <a href="https://instagram.com/menorcainversiones?igshid=10cetn29cdmvu" target="_blank"><img data-file-id="5913821" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/56759879-13ae-e122-c7cc-65e9c3fe710d.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;"
                                                                              width="24"></a>&nbsp;
                                                                      <a href="https://www.facebook.com/menorcalotes" target="_blank"><img data-file-id="5913825" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/48690c0a-d09f-4380-86da-cb88dec0c82d.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;"
                                                                              width="24"></a>&nbsp;
                                                                      <a href="https://tiktok.com/@menorcainversiones" target="_blank"><img data-file-id="5913817" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/1eea6d59-7251-f0c6-d657-2a157d2fc52e.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;"
                                                                              width="24"></a>&nbsp;
                                                                      <a href="https://pe.linkedin.com/company/menorca-inversiones-s-a-c" target="_blank"><img data-file-id="5913813" height="24" src="https://mcusercontent.com/0d91e38c551b9021ff51d74ab/images/2346c5ce-2cdd-fa62-7893-7f38700ba837.png" style="border: 0px  ; width: 24px; height: 24px; margin: 0px;"
                                                                              width="24"></a>
                                                                  </div>
  
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!--[if mso]>
      </td>
      <![endif]-->
  
                                                  <!--[if mso]>
      </tr>
      </table>
      <![endif]-->
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </td>
                          </tr>
  
                      </table>
                      <!--[if (gte mso 9)|(IE)]>
                      </td>
                      </tr>
                      </table>
                      <![endif]-->
                      <!-- // END TEMPLATE -->
                  </td>
              </tr>
          </table>
      </center>
      <script type="text/javascript" src="/PxtHz/uB/J/1/CvUJv9EyAQ4/b55fLcDLEwiV/Ay4KP0QVAw/DjxY/PBkpEjE"></script>
  </body>
  
  </html>`;

    return html;
  }
};
