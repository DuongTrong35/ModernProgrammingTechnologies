import "./HomeContainerLayout.css";
import logoweb from "../public/assets/images/konoha.png";
import Footer from "../components/footer";

export default function HomeContainerLayout({
	headerContent,
	leftContent,
	rightContent,
	footerContent
}) {
	const defaultHeader = (
		<div className="header-wrapper">
			<div className="header-inner">
				<div className="header-left">
					<div className="lang">
						<span className="flag">🇻🇳</span>
						<span className="text">VI</span>
						<span className="arrow">▼</span>
					</div>

					<div className="app-download">
						<span className="icon">●</span>
						<span className="text">Tải ứng dụng</span>
						<span className="arrow">▼</span>
					</div>
				</div>

				<div className="header-center">
					<img src={logoweb} alt="logo" className="futa-logo" />
					<h2 className="route">Buôn Ma Thuột – TP. Hồ Chí Minh</h2>
					<p className="date">Thứ 4, 26/11</p>
				</div>

				<div className="header-right">
					<div className="profile">
						<span className="avatar">🧑</span>
						<span className="name">Long Distance Bus</span>
						<span className="arrow">▼</span>
					</div>
				</div>
			</div>
		</div>
	);

	const hasRightContent = Boolean(rightContent);
	const showHeader = headerContent !== undefined && headerContent !== null;

	return (
		<div className="HomeContainer">
			<main className="ld-maintrip">
        <section className="ld-hero">
          <div className="ld-hero-banner">
            <div className="ld-hero-left">
              <div className="ld-hero-eyebrow">Long Distance Bus Lines</div>
              <h1 className="ld-hero-title">
                Vững tin trên mọi chặng đường dài
              </h1>
              <p className="ld-hero-sub">
                Mạng lưới xe khách liên tỉnh, trung chuyển tận nơi và dịch vụ
                chăm sóc khách hàng tận tâm, giúp hành trình của bạn luôn an
                toàn và thoải mái.
              </p>
              <div className="ld-hero-pill">
                {/* <span className="ld-hero-pill-number">{dscd.length}</span> */}
                <span className="ld-hero-pill-text">
                  Tuyến xe hoạt động mỗi ngày
                </span>
              </div>
            </div>
            <div className="ld-hero-right">
              <div className="ld-hero-city" />
              <div className="ld-hero-bus-shadow" />
              <div className="ld-hero-bus">
                <div className="ld-hero-bus-top">
                  <div className="ld-hero-bus-window-row">
                    <div className="ld-hero-bus-window" />
                    <div className="ld-hero-bus-window" />
                    <div className="ld-hero-bus-window" />
                  </div>
                </div>
                <div className="ld-hero-bus-door" />
                <div className="ld-hero-bus-wheel ld-hero-bus-wheel--front" />
                <div className="ld-hero-bus-wheel ld-hero-bus-wheel--back" />
              </div>
            </div>
          </div>
        </section>
      </main>
			{showHeader && (headerContent || defaultHeader)}
			<div className={`HomeCenter${hasRightContent ? "" : " HomeCenter--single"}`}>
				<div className={`HomeLeft${hasRightContent ? "" : " HomeLeft--single"}`}>
					{leftContent}
				</div>
				{hasRightContent && <div className="HomeRight">{rightContent}</div>}
			</div>
				  <Footer />
			
		</div>
	);
}


