import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Search } from 'src/app/models/utils.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;

  search$: BehaviorSubject<string> = new BehaviorSubject('');  
  isResearching: boolean = false;

  openSideBarById: string | null = null;

  constructor(
    public _fb: FormBuilder,
    private _activateRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.form = this._fb.group({
      search: [null],
    });

    this.form.get('search')?.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(res => {
        this.search$.next(res);
        this._router.navigate(['/pokemon', res]);
        this.isResearching = (res) ? true : false;
      });
  }

  ngOnInit(): void {
    this._activateRoute.paramMap.subscribe(params => {
      this.openSideBarById = params.get('id');
    });
  }

  onScroll(event: any) {
    
  }

}
